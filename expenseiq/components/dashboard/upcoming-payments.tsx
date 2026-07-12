import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays, AlertCircle } from "lucide-react";
import { UpcomingPayment } from "@/types/dashboard";

interface UpcomingPaymentsProps {
  data: UpcomingPayment[];
}

export function UpcomingPayments({ data }: UpcomingPaymentsProps) {
  return (
    <Card className="border border-neutral-border bg-card shadow-2xs h-full flex flex-col justify-between">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-xs font-bold text-text-secondary tracking-wider uppercase flex items-center justify-between">
          <span>Upcoming Payments</span>
          <CalendarDays className="size-4 text-text-muted" />
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col justify-start divide-y divide-neutral-border pt-0 pb-4">
        {data.length > 0 ? (
          data.map((pay) => (
            <div key={pay.id} className="py-3 flex items-center justify-between gap-4 first:pt-1 last:pb-1">
              <div className="space-y-1 min-w-0">
                <h4 className="text-xs font-bold text-text-primary truncate leading-tight">
                  {pay.name}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="inline-block text-[8px] font-bold text-text-muted bg-neutral-secondary-bg px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                    {pay.category}
                  </span>
                  <span className="text-[10px] text-text-muted font-medium">
                    Due: {pay.dueDate}
                  </span>
                </div>
              </div>
              
              <div className="text-right shrink-0">
                <span className="block text-xs font-extrabold text-text-primary">
                  ₹{pay.amount.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-status-warning mt-1">
                  <AlertCircle className="size-2.5 shrink-0" />
                  Pending
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-text-muted flex flex-col items-center justify-center">
            <CalendarDays className="size-8 mb-2 text-text-disabled" />
            <p className="text-xs font-medium">No upcoming payments scheduled.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
