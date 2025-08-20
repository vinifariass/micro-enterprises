import { Award, Star, ThumbsUp, TrendingUp, Users } from "lucide-react";

type RecentReview = {
  author: string;
  rating: number; // 1-5
  time: string;
  text: string;
  product?: string;
};

type Props = {
  title?: string;
  satisfaction?: number; // 0-100
  total?: number;
  average?: number; // 0-5
  growth?: number; // %
  distribution?: Record<1 | 2 | 3 | 4 | 5, number>;
  recent?: RecentReview[];
};

export default function CustomerReviews({
  title = "Customer Review Analytics",
  satisfaction = 97,
  total = 2547,
  average = 4.8,
  growth = 15,
  distribution = { 5: 1893, 4: 509, 3: 102, 2: 25, 1: 18 },
  recent = [
    { author: "Maria Garcia", rating: 5, time: "2 hours ago", text: "Outstanding quality and fast delivery. Exceeded my expectations!", product: "Wireless Earbuds Pro" },
    { author: "Kevin Johnson", rating: 5, time: "5 hours ago", text: "Perfect product, works exactly as described. Great value for money.", product: "Smart Home Hub" },
    { author: "Lisa Chen", rating: 4, time: "1 day ago", text: "Really good product overall. Minor shipping delay but worth the wait.", product: "Bluetooth Speaker" },
  ],
}: Props) {
  const totalCount = (Object.values(distribution) as number[]).reduce((a, b) => a + b, 0) || total;
  const pct = (n: number) => Math.round((n / totalCount) * 100);

  return (
    <section className="container mx-auto px-4 py-12 md:px-6 lg:py-16 2xl:max-w-[1400px]">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">Comprehensive insights from our customer feedback and reviews</p>
      </div>

      {/* KPI cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Customer Satisfaction" value={`${satisfaction}%`} hint="Would recommend to friends" badge={`+2.3%`} icon={<ThumbsUp className="size-4 text-muted-foreground" />} />
        <KpiCard title="Total Reviews" value={total.toLocaleString()} hint="Verified customer reviews" badge={`+324 this month`} icon={<Users className="size-4 text-muted-foreground" />} />
        <KpiCard title="Quality Rating" value={`${average.toFixed(1)}/5`} hint="Average product rating" badge={"+0.2 this quarter"} icon={<Award className="size-4 text-muted-foreground" />} />
        <KpiCard title="Growth Rate" value={`${growth}%`} hint="Monthly review increase" badge={"Consistent growth"} icon={<TrendingUp className="size-4 text-muted-foreground" />} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Rating distribution */}
        <div data-slot="card" className="bg-card text-card-foreground flex flex-col rounded-xl border py-6 shadow-sm gap-3">
          <div className="px-6">
            <div className="leading-none font-semibold flex items-center gap-2">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              Rating Distribution
            </div>
          </div>
          <div className="px-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{average.toFixed(1)}</div>
                <div className="mt-1 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < Math.round(average) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <div className="text-muted-foreground mt-1 text-sm">{total.toLocaleString()} reviews</div>
              </div>
            </div>

            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-4">
                <div className="flex w-16 items-center gap-1">
                  <span className="text-sm">{rating}</span>
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="bg-primary/20 relative w-full overflow-hidden rounded-full h-2 flex-1">
                  <div className="bg-primary h-full transition-all" style={{ width: `${pct(distribution[rating as 1 | 2 | 3 | 4 | 5])}%` }} />
                </div>
                <div className="text-muted-foreground w-12 text-right text-sm">{distribution[rating as 1 | 2 | 3 | 4 | 5]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent reviews */}
        <div data-slot="card" className="bg-card text-card-foreground flex flex-col rounded-xl border py-6 shadow-sm gap-3">
          <div className="px-6">
            <div className="leading-none font-semibold">Recent Reviews</div>
          </div>
          <div className="px-6 space-y-6">
            {recent.map((r, i) => (
              <div key={i} className="border-border border-b pb-4 last:border-0 last:pb-0">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">{r.author}</h4>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`size-3 ${s < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-muted-foreground text-xs">{r.time}</span>
                </div>
                <p className="text-muted-foreground mb-2 text-sm">{r.text}</p>
                {r.product && <p className="text-xs font-medium">{r.product}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom KPIs */}
      <div className="mt-12 text-center">
        <div data-slot="card" className="bg-card text-card-foreground inline-block rounded-xl border py-6 shadow-sm">
          <div className="px-6">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{satisfaction}%</div>
                <div className="text-muted-foreground text-sm">Customers recommend us</div>
              </div>
              <div className="bg-border h-12 w-px" />
              <div className="text-center">
                <div className="text-2xl font-bold">{average.toFixed(1)}/5</div>
                <div className="text-muted-foreground text-sm">Overall satisfaction</div>
              </div>
              <div className="bg-border h-12 w-px" />
              <div className="text-center">
                <div className="text-2xl font-bold">{((distribution[5] + distribution[4]) / totalCount * 100).toFixed(1)}%</div>
                <div className="text-muted-foreground text-sm">Verified purchases</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KpiCard({ title, value, hint, badge, icon }: { title: string; value: string; hint: string; badge: string; icon: React.ReactNode }) {
  return (
    <div data-slot="card" className="bg-card text-card-foreground flex flex-col rounded-xl border py-6 shadow-sm gap-3">
      <div className="px-6 flex items-center justify-between">
        <div className="text-sm font-medium">{title}</div>
        {icon}
      </div>
      <div className="px-6">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-muted-foreground mb-2 text-xs">{hint}</p>
        <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs w-fit bg-secondary text-secondary-foreground border-transparent">{badge}</span>
      </div>
    </div>
  );
}
