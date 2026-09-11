"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CarFront, LogOut, Pencil, Save, Users, X } from "lucide-react";

type AdminUser = {
  id: string | number;
  username: string;
  email: string | null;
  role: string;
  created_at: string | null;
};

type SessionUser = {
  id: string | number;
  username: string;
  email: string | null;
  role: string;
};

type AdminVehicle = {
  id: string | number;
  slug: string;
  brand?: string;
  name: string;
  model: string | null;
  variant: string | null;
  category: string;
  image: string | null;
  hero_image: string | null;
  horsepower: string | null;
  acceleration: string | null;
  engine: string | null;
  seats: number | null;
  price: string;
  year: number | null;
  published: boolean;
  description: string | null;
  brands?: { name: string } | { name: string }[] | null;
};

type TrackingRecord = {
  tracking_id: string;
  vehicle_id: number;
  status: string;
  location: string;
  estimated_delivery: string | null;
  notes: string;
  vehicles?: { name: string; brand: string } | null;
};

const trackingStatuses = ["Order received", "Preparing vehicle", "In transit", "Ready for collection", "Completed"];

export default function AdminPage() {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [vehicles, setVehicles] = useState<AdminVehicle[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<AdminVehicle | null>(null);
  const [vehicleDraft, setVehicleDraft] = useState<Partial<AdminVehicle>>({});
  const [savingVehicle, setSavingVehicle] = useState(false);
  const [vehicleError, setVehicleError] = useState("");
  const [tracking, setTracking] = useState<TrackingRecord[]>([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "employee" });
  const [newTracking, setNewTracking] = useState({ tracking_id: "", vehicle_id: "", status: "Order received" });
  const [staffError, setStaffError] = useState("");

  const loadUsers = async () => {
    const [usersResponse, vehiclesResponse] = await Promise.all([
      fetch("/api/admin/users"),
      fetch("/api/admin/vehicles"),
    ]);
    const usersData = usersResponse.ok ? (await usersResponse.json()) as { users: AdminUser[] } : { users: [] };
    const vehiclesData = vehiclesResponse.ok
      ? ((await vehiclesResponse.json()) as { vehicles: AdminVehicle[] })
      : { vehicles: [] };
    setUsers(usersData.users);
    setVehicles(vehiclesData.vehicles);
    const trackingResponse = await fetch("/api/admin/tracking");
    if (trackingResponse.ok) setTracking(((await trackingResponse.json()) as { tracking: TrackingRecord[] }).tracking);
  };

  useEffect(() => {
    const restoreSession = async () => {
      const response = await fetch("/api/admin/session");
      const data = (await response.json()) as {
        authenticated: boolean;
        user: SessionUser | null;
      };

      if (data.authenticated && data.user) {
        setSessionUser(data.user);
        await loadUsers();
      }
    };

    void restoreSession();
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as { error?: string; user?: SessionUser };
      if (!response.ok || !data.user) {
        setError(data.error ?? "Unable to sign in");
        return;
      }
      setSessionUser(data.user);
      setPassword("");
      await loadUsers();
    } catch {
      setError("Unable to reach the admin service");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setSessionUser(null);
    setUsers([]);
    setVehicles([]);
    setTracking([]);
  };

  const createUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStaffError("");
    const response = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newUser) });
    const data = (await response.json()) as { error?: string; user?: AdminUser };
    if (!response.ok || !data.user) { setStaffError(data.error ?? "Unable to create user"); return; }
    setUsers((current) => [data.user!, ...current]);
    setNewUser({ username: "", password: "", role: "employee" });
  };

  const createTracking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStaffError("");
    const response = await fetch("/api/admin/tracking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newTracking) });
    const data = (await response.json()) as { error?: string; tracking?: TrackingRecord };
    if (!response.ok || !data.tracking) { setStaffError(data.error ?? "Unable to create tracking record"); return; }
    setTracking((current) => [data.tracking!, ...current]);
    setNewTracking({ tracking_id: "", vehicle_id: "", status: "Order received" });
  };

  const updateTracking = async (record: TrackingRecord, field: "status" | "location" | "estimated_delivery" | "notes", value: string) => {
    const response = await fetch(`/api/admin/tracking/${encodeURIComponent(record.tracking_id)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...record, [field]: value }) });
    const data = (await response.json()) as { error?: string; tracking?: TrackingRecord };
    if (!response.ok || !data.tracking) { setStaffError(data.error ?? "Unable to update tracking record"); return; }
    setTracking((current) => current.map((item) => item.tracking_id === record.tracking_id ? data.tracking! : item));
  };

  const startEditingVehicle = (vehicle: AdminVehicle) => {
    setEditingVehicle(vehicle);
    setVehicleDraft({ ...vehicle });
    setVehicleError("");
  };

  const saveVehicle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingVehicle) return;
    setSavingVehicle(true);
    setVehicleError("");

    try {
      const response = await fetch(`/api/admin/vehicles/${editingVehicle.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: vehicleDraft.slug,
          brand: vehicleDraft.brand,
          name: vehicleDraft.name,
          model: vehicleDraft.model,
          variant: vehicleDraft.variant,
          category: vehicleDraft.category,
          image: vehicleDraft.image,
          hero_image: vehicleDraft.hero_image,
          horsepower: vehicleDraft.horsepower,
          acceleration: vehicleDraft.acceleration,
          engine: vehicleDraft.engine,
          seats: vehicleDraft.seats,
          price: vehicleDraft.price,
          year: vehicleDraft.year,
          description: vehicleDraft.description,
          published: vehicleDraft.published,
        }),
      });
      const data = (await response.json()) as { error?: string; vehicle?: AdminVehicle };
      if (!response.ok || !data.vehicle) {
        setVehicleError(data.error ?? "Unable to save vehicle");
        return;
      }
      setVehicles((current) => current.map((vehicle) => vehicle.id === data.vehicle!.id ? data.vehicle! : vehicle));
      setEditingVehicle(null);
    } catch {
      setVehicleError("Unable to reach the vehicle service");
    } finally {
      setSavingVehicle(false);
    }
  };

  const updateVehicleDraft = (field: keyof AdminVehicle, value: string | number | boolean) => {
    setVehicleDraft((current) => ({ ...current, [field]: value }));
  };

  if (!sessionUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-4 py-10 text-white sm:px-6">
        <section className="w-full max-w-md border border-white/10 bg-[#111111] p-6 sm:p-10">
          <div className="mb-10 border-b border-white/10 pb-6">
            <p className="font-stint text-[8px] uppercase tracking-[0.28em] text-[#bd9852]">Cyber Torque</p>
            <h1 className="mt-4 font-stint text-4xl uppercase leading-none">Admin access</h1>
          </div>
          <form className="grid gap-5" onSubmit={handleLogin}>
            <label className="grid gap-2 font-stint text-[8px] uppercase tracking-[0.16em] text-white/45">
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                className="min-w-0 border border-white/15 bg-transparent px-4 py-4 font-sans text-sm normal-case tracking-normal text-white outline-none transition-colors focus:border-[#bd9852]"
                required
              />
            </label>
            <label className="grid gap-2 font-stint text-[8px] uppercase tracking-[0.16em] text-white/45">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="min-w-0 border border-white/15 bg-transparent px-4 py-4 font-sans text-sm normal-case tracking-normal text-white outline-none transition-colors focus:border-[#bd9852]"
                required
              />
            </label>
            {error && <p className="font-sans text-sm text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex min-h-12 items-center justify-between bg-[#bd9852] px-5 py-4 font-stint text-[9px] uppercase tracking-[0.14em] text-black transition-colors hover:bg-[#d0ae68] disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Signing in" : "Sign in"}
              <ArrowUpRight size={16} strokeWidth={1.4} />
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0b0b0b] text-white">
      <header className="border-b border-white/10 px-4 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="font-stint text-[8px] uppercase tracking-[0.28em] text-[#bd9852]">Cyber Torque</p>
            <h1 className="mt-2 font-stint text-2xl uppercase sm:text-3xl">Admin panel</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 border border-white/15 px-3 py-3 font-stint text-[8px] uppercase tracking-[0.12em] text-white/60 transition-colors hover:border-[#bd9852] hover:text-[#bd9852] sm:px-4"
          >
            <LogOut size={14} strokeWidth={1.3} />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-white/10 bg-[#111111] p-5">
            <Users size={18} strokeWidth={1.2} className="text-[#bd9852]" />
            <p className="mt-6 font-stint text-[8px] uppercase tracking-[0.16em] text-white/40">Users</p>
            <p className="mt-2 font-stint text-3xl">{users.length}</p>
          </div>
          <div className="border border-white/10 bg-[#111111] p-5">
            <CarFront size={18} strokeWidth={1.2} className="text-[#bd9852]" />
            <p className="mt-6 font-stint text-[8px] uppercase tracking-[0.16em] text-white/40">Vehicles</p>
            <p className="mt-2 font-stint text-3xl">{vehicles.length}</p>
          </div>
          <div className="border border-white/10 bg-[#111111] p-5 sm:col-span-2 lg:col-span-2">
            <p className="font-stint text-[8px] uppercase tracking-[0.16em] text-white/40">Signed in as</p>
            <p className="mt-3 wrap-break-word font-stint text-xl uppercase text-[#bd9852]">{sessionUser.username}</p>
            <p className="mt-2 break-all font-sans text-sm text-white/45">{sessionUser.email ?? "No email on record"}</p>
          </div>
        </div>
        <section className="border border-white/10 bg-[#111111]">
          <div className="border-b border-white/10 px-5 py-5 sm:px-6">
            <h2 className="font-stint text-xl uppercase">Users table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 font-stint text-[8px] uppercase tracking-[0.14em] text-white/35">
                  <th className="px-5 py-4 sm:px-6">Username</th>
                  <th className="px-5 py-4 sm:px-6">Email</th>
                  <th className="px-5 py-4 sm:px-6">Role</th>
                  <th className="px-5 py-4 sm:px-6">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/10 last:border-0 font-sans text-sm text-white/70">
                    <td className="px-5 py-4 sm:px-6">{user.username}</td>
                    <td className="px-5 py-4 sm:px-6">{user.email ?? "-"}</td>
                    <td className="px-5 py-4 sm:px-6 uppercase">{user.role}</td>
                    <td className="px-5 py-4 sm:px-6">{user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {users.length === 0 && <p className="px-5 py-8 font-sans text-sm text-white/45 sm:px-6">No users found.</p>}
        </section>
        {sessionUser.role === "admin" && (
          <section className="mt-8 border border-white/10 bg-[#111111] p-5 sm:p-6">
            <h2 className="font-stint text-xl uppercase">Add staff user</h2>
            <form onSubmit={createUser} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <input required placeholder="Username" value={newUser.username} onChange={(event) => setNewUser({ ...newUser, username: event.target.value })} className="border border-white/15 bg-transparent px-3 py-3 font-sans text-sm outline-none focus:border-[#bd9852]" />
              <input required minLength={8} type="password" placeholder="Password (8+ chars)" value={newUser.password} onChange={(event) => setNewUser({ ...newUser, password: event.target.value })} className="border border-white/15 bg-transparent px-3 py-3 font-sans text-sm outline-none focus:border-[#bd9852]" />
              <select value={newUser.role} onChange={(event) => setNewUser({ ...newUser, role: event.target.value })} className="border border-white/15 bg-[#111111] px-3 py-3 font-sans text-sm outline-none"><option value="employee">Employee</option><option value="admin">Admin</option></select>
              <button className="bg-[#bd9852] px-4 py-3 font-stint text-[8px] uppercase tracking-[0.14em] text-black">Create user</button>
            </form>
          </section>
        )}
        <section className="mt-8 border border-white/10 bg-[#111111] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-stint text-xl uppercase">Vehicle tracking</h2>
            <span className="font-stint text-[8px] uppercase tracking-[0.14em] text-white/35">{tracking.length} records</span>
          </div>
          {sessionUser.role === "admin" && (
            <form onSubmit={createTracking} className="mt-5 grid gap-3 sm:grid-cols-4">
              <input required placeholder="Tracking ID" value={newTracking.tracking_id} onChange={(event) => setNewTracking({ ...newTracking, tracking_id: event.target.value })} className="border border-white/15 bg-transparent px-3 py-3 font-sans text-sm outline-none focus:border-[#bd9852]" />
              <select required value={newTracking.vehicle_id} onChange={(event) => setNewTracking({ ...newTracking, vehicle_id: event.target.value })} className="border border-white/15 bg-[#111111] px-3 py-3 font-sans text-sm outline-none"><option value="">Select vehicle</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.brand ?? ""} {vehicle.name}</option>)}</select>
              <select value={newTracking.status} onChange={(event) => setNewTracking({ ...newTracking, status: event.target.value })} className="border border-white/15 bg-[#111111] px-3 py-3 font-sans text-sm outline-none">{trackingStatuses.map((status) => <option key={status}>{status}</option>)}</select>
              <button className="bg-[#bd9852] px-4 py-3 font-stint text-[8px] uppercase tracking-[0.14em] text-black">Create tracking ID</button>
            </form>
          )}
          {staffError && <p className="mt-4 font-sans text-sm text-red-300">{staffError}</p>}
          <div className="mt-6 grid gap-3">
            {tracking.map((record) => (
              <article key={record.tracking_id} className="grid gap-3 border-t border-white/10 py-4 sm:grid-cols-[1fr_1fr_1fr_1fr] sm:items-center">
                <div><p className="font-stint text-[9px] uppercase text-[#bd9852]">{record.tracking_id}</p><p className="mt-1 font-sans text-sm text-white/70">{record.vehicles ? `${record.vehicles.brand} ${record.vehicles.name}` : "Vehicle"}</p></div>
                <select value={record.status} onChange={(event) => void updateTracking(record, "status", event.target.value)} className="border border-white/15 bg-[#111111] px-3 py-2 font-sans text-sm outline-none">{trackingStatuses.map((status) => <option key={status}>{status}</option>)}</select>
                <input value={record.location} placeholder="Location" onChange={(event) => setTracking((current) => current.map((item) => item.tracking_id === record.tracking_id ? { ...item, location: event.target.value } : item))} onBlur={(event) => void updateTracking(record, "location", event.target.value)} className="border border-white/15 bg-transparent px-3 py-2 font-sans text-sm outline-none focus:border-[#bd9852]" />
                <input type="date" value={record.estimated_delivery ?? ""} onChange={(event) => void updateTracking(record, "estimated_delivery", event.target.value)} className="border border-white/15 bg-transparent px-3 py-2 font-sans text-sm text-white outline-none focus:border-[#bd9852]" />
              </article>
            ))}
          </div>
          {tracking.length === 0 && <p className="mt-6 font-sans text-sm text-white/45">No tracking records found.</p>}
        </section>
        <section className="mt-8 border border-white/10 bg-[#111111]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
            <h2 className="font-stint text-xl uppercase">Vehicles</h2>
            <span className="font-stint text-[8px] uppercase tracking-[0.14em] text-white/35">
              {vehicles.length} records
            </span>
          </div>
          {vehicles.length > 0 ? (
            <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => {
                const brand =
                  vehicle.brand ||
                  (Array.isArray(vehicle.brands)
                    ? vehicle.brands[0]?.name
                    : vehicle.brands?.name);
                return (
                  <article key={vehicle.id} className="bg-[#111111] p-5">
                    <div className="relative aspect-[1.45] overflow-hidden bg-[#181818]">
                      {vehicle.image ? (
                        <Image
                          src={vehicle.image}
                          alt={`${brand ?? "Vehicle"} ${vehicle.name}`}
                          fill
                          unoptimized
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center font-stint text-[8px] uppercase tracking-[0.14em] text-white/30">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-stint text-[8px] uppercase tracking-[0.16em] text-[#bd9852]">
                          {brand ?? vehicle.category}
                        </p>
                        <h3 className="mt-2 font-stint text-lg uppercase">{vehicle.name}</h3>
                        <p className="mt-1 font-sans text-xs text-white/40">
                          {vehicle.variant ?? vehicle.model ?? vehicle.engine ?? "-"}
                        </p>
                      </div>
                      <span className="shrink-0 border border-white/10 px-2 py-1 font-stint text-[7px] uppercase tracking-[0.12em] text-white/45">
                        {vehicle.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-4 font-sans text-xs text-white/55">
                      <span>{vehicle.horsepower ?? "-"}</span>
                      <span>{vehicle.acceleration ?? "-"}</span>
                      <span>{vehicle.engine ?? "-"}</span>
                      <span>{vehicle.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => startEditingVehicle(vehicle)}
                      className="mt-5 flex w-full items-center justify-center gap-2 border border-white/15 px-4 py-3 font-stint text-[8px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-[#bd9852] hover:text-[#bd9852]"
                    >
                      <Pencil size={13} strokeWidth={1.3} />
                      Edit vehicle
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="px-5 py-8 font-sans text-sm text-white/45 sm:px-6">No vehicles found.</p>
          )}
        </section>
      </section>
      {editingVehicle && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm sm:items-center sm:py-10">
          <section className="w-full max-w-3xl border border-white/15 bg-[#111111] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
              <div>
                <p className="font-stint text-[8px] uppercase tracking-[0.2em] text-[#bd9852]">Vehicle editor</p>
                <h2 className="mt-2 font-stint text-2xl uppercase">{editingVehicle.name}</h2>
              </div>
              <button type="button" onClick={() => setEditingVehicle(null)} aria-label="Close vehicle editor" className="text-white/50 transition-colors hover:text-white">
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>
            <form onSubmit={saveVehicle} className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
              {([
                ["name", "Name"], ["slug", "Slug"], ["model", "Model"], ["variant", "Variant"],
                ["brand", "Brand"], ["name", "Name"], ["slug", "Slug"], ["model", "Model"], ["variant", "Variant"],
                ["category", "Category"], ["image", "Image URL"], ["hero_image", "Hero image URL"],
                ["horsepower", "Horsepower"], ["acceleration", "Acceleration"], ["engine", "Engine"],
                ["seats", "Seats"], ["price", "Price"], ["year", "Year"],
              ] as const).map(([field, label]) => (
                <label key={field} className="grid gap-2 font-stint text-[8px] uppercase tracking-[0.14em] text-white/45">
                  {label}
                  <input
                    value={vehicleDraft[field] ?? ""}
                    onChange={(event) => updateVehicleDraft(field, field === "seats" || field === "year" ? Number(event.target.value) : event.target.value)}
                    className="min-w-0 border border-white/15 bg-transparent px-3 py-3 font-sans text-sm normal-case tracking-normal text-white outline-none focus:border-[#bd9852]"
                  />
                </label>
              ))}
              <label className="grid gap-2 font-stint text-[8px] uppercase tracking-[0.14em] text-white/45">
                Description
                <textarea value={vehicleDraft.description ?? ""} onChange={(event) => updateVehicleDraft("description", event.target.value)} className="min-h-28 border border-white/15 bg-transparent px-3 py-3 font-sans text-sm normal-case tracking-normal text-white outline-none focus:border-[#bd9852] sm:col-span-2" />
              </label>
              <label className="flex items-center gap-3 font-stint text-[8px] uppercase tracking-[0.14em] text-white/55 sm:col-span-2">
                <input type="checkbox" checked={Boolean(vehicleDraft.published)} onChange={(event) => updateVehicleDraft("published", event.target.checked)} className="h-4 w-4 accent-[#bd9852]" />
                Published
              </label>
              {vehicleError && <p className="font-sans text-sm text-red-300 sm:col-span-2">{vehicleError}</p>}
              <div className="flex justify-end gap-3 border-t border-white/10 pt-5 sm:col-span-2">
                <button type="button" onClick={() => setEditingVehicle(null)} className="border border-white/15 px-5 py-3 font-stint text-[8px] uppercase tracking-[0.14em] text-white/55 hover:text-white">Cancel</button>
                <button type="submit" disabled={savingVehicle} className="flex items-center gap-2 bg-[#bd9852] px-5 py-3 font-stint text-[8px] uppercase tracking-[0.14em] text-black disabled:opacity-60">
                  <Save size={13} strokeWidth={1.3} />
                  {savingVehicle ? "Saving" : "Save changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
