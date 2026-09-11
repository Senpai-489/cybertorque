import { createClient } from "./client";

export const STORAGE_BUCKET = "cybertirque";
export const FALLBACK_STORAGE_BUCKET = "cybertorque";

export const VEHICLE_STORAGE_FOLDERS: Record<string, string> = {
  "gmc-yukon-denali": "GMC-Yukon-Denali",
  "cadillac-escalade": "Cadillac-Escalade",
  "cadillac-lyriq": "Cadillac-Lyriq",
  "cadillac-vistiq": "Cadillac-Vistiq",
  "chevrolet-corvette": "Chevrolet-Corvette",
  "chevrolet-silverado-2500-hd": "Chevrolet-Silverado",
  "dodge-charger-petrol": "Dodge-Charger",
  "dodge-charger-ev": "Dodge-Charger",
  "dodge-durango": "Dodge-Durango",
  "ford-bronco-raptor": "Ford-Bronco-Raptor",
  "ford-mustang-mach-e": "Ford-Mustang-Mach-E",
  "ford-mustang": "Ford-Mustang",
  "gmc-hummer-ev-suv": "GMC-Hummer-Ev",
  "gmc-hummer-ev-pickup": "GMC-Hummer-Ev",
  "lincoln-navigator": "Lincoln-Navigator",
  "ram-2500": "Ram-2500",
  "tesla-cybertruck": "Tesla-Cyber-Truck",
};

export function getVehicleStorageFolder(slug: string): string {
  if (VEHICLE_STORAGE_FOLDERS[slug]) {
    return VEHICLE_STORAGE_FOLDERS[slug];
  }

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}

export function getPublicStorageUrl(bucket: string, path: string): string {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://mhzvlxcqpgmzesulmnkx.supabase.co";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

export interface StorageAssetResult {
  frames: string[];
  colors?: { name: string; folder: string; frames: string[] }[];
  interiorImage?: string;
  source: "storage-live" | "storage-synthesized" | "catalog";
}

/**
 * Fetches vehicle 360 frames and assets from Supabase storage bucket `cybertirque`.
 */
export async function fetchVehicleStorageAssets(
  slug: string,
  fallbackFrames: string[] = []
): Promise<StorageAssetResult> {
  const folder = getVehicleStorageFolder(slug);
  const supabase = createClient();

  try {
    // 1. Attempt to list from primary bucket "cybertirque"
    let { data: files, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(folder, {
        limit: 100,
        sortBy: { column: "name", order: "asc" },
      });

    let activeBucket = STORAGE_BUCKET;

    // If failed or empty, try fallback bucket
    if ((error || !files || files.length === 0) && STORAGE_BUCKET !== FALLBACK_STORAGE_BUCKET) {
      const fallbackRes = await supabase.storage
        .from(FALLBACK_STORAGE_BUCKET)
        .list(folder, {
          limit: 100,
          sortBy: { column: "name", order: "asc" },
        });

      if (fallbackRes.data && fallbackRes.data.length > 0) {
        files = fallbackRes.data;
        activeBucket = FALLBACK_STORAGE_BUCKET;
        error = null;
      }
    }

    // Filter image files
    const imageFiles = (files || []).filter((item) => {
      const ext = item.name.toLowerCase();
      return (
        ext.endsWith(".png") ||
        ext.endsWith(".jpg") ||
        ext.endsWith(".jpeg") ||
        ext.endsWith(".webp")
      );
    });

    if (imageFiles.length > 0) {
      imageFiles.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );

      const frames = imageFiles.map((file) => {
        const { data } = supabase.storage
          .from(activeBucket)
          .getPublicUrl(`${folder}/${file.name}`);
        return data.publicUrl;
      });

      return {
        frames,
        source: "storage-live",
      };
    }
  } catch (err) {
    console.warn("Could not list supabase storage assets directly:", err);
  }

  // 2. Synthesize Supabase storage URLs for standard 360 frames
  const synthesizedFrames: string[] = [];
  for (let i = 1; i <= 24; i++) {
    synthesizedFrames.push(
      getPublicStorageUrl(STORAGE_BUCKET, `${folder}/${i}.png`)
    );
  }

  return {
    frames: fallbackFrames.length > 0 ? fallbackFrames : synthesizedFrames,
    source: fallbackFrames.length > 0 ? "catalog" : "storage-synthesized",
  };
}

