import { Building2 } from "lucide-react";
import { SiInfosys } from "react-icons/si";
import { cn } from "@/lib/cn";

export function CompanyIcon({ company, className }: { company: string; className?: string }) {
  const normalizedCompany = company.toLowerCase();
  const isMicrosoft = normalizedCompany.includes("microsoft");
  const isInfosys = normalizedCompany.includes("infosys");
  const isNasscom = normalizedCompany.includes("nasscom");
  const iconStyle = isMicrosoft
    ? {
        color: "#f3f4f6",
        borderColor: "rgba(255,255,255,0.22)",
        backgroundColor: "rgba(255,255,255,0.08)",
        boxShadow:
          "0 0 18px rgba(242,80,34,0.12), 0 0 24px rgba(0,164,239,0.12)"
      }
    : isInfosys
      ? {
          color: "#007cc3",
          borderColor: "rgba(0,124,195,0.34)",
          backgroundColor: "rgba(0,124,195,0.12)",
          boxShadow: "0 0 22px rgba(0,124,195,0.2)"
        }
      : isNasscom
        ? {
            color: "#f26522",
            borderColor: "rgba(242,101,34,0.34)",
            backgroundColor: "rgba(242,101,34,0.12)",
            boxShadow: "0 0 22px rgba(242,101,34,0.2)"
          }
        : {
            color: "rgb(var(--brand))",
            borderColor: "rgb(var(--brand) / 0.3)",
            backgroundColor: "rgb(var(--brand) / 0.1)",
            boxShadow: "0 0 22px rgb(var(--brand) / 0.16)"
          };

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
        className
      )}
      style={iconStyle}
    >
      {isMicrosoft ? (
        <span
          aria-hidden="true"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 0.58rem)",
            gridAutoRows: "0.58rem",
            gap: "3px"
          }}
        >
          {["#f25022", "#7fba00", "#00a4ef", "#ffb900"].map((color) => (
            <span key={color} style={{ backgroundColor: color }} />
          ))}
        </span>
      ) : isInfosys ? (
        <SiInfosys size={22} />
      ) : (
        <Building2 size={21} />
      )}
    </span>
  );
}
