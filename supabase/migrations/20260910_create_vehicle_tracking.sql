-- Create vehicle_tracking table
create table if not exists public.vehicle_tracking (
  tracking_id        text primary key,
  vehicle_id         integer not null references public.vehicles(id) on delete cascade,
  status             text not null default 'Order received'
                       check (status in ('Order received','Preparing vehicle','In transit','Ready for collection','Completed')),
  location           text not null default '',
  notes              text not null default '',
  estimated_delivery text,
  updated_by         text,
  updated_at         timestamptz not null default now(),
  created_at         timestamptz not null default now()
);

-- Enable RLS (service role bypasses it automatically)
alter table public.vehicle_tracking enable row level security;

-- Allow service role full access
create policy if not exists "service_role_all" on public.vehicle_tracking
  as permissive for all
  to service_role
  using (true)
  with check (true);
