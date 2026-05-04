import { useMemo } from "react";
import { type Host } from './Models';

interface HostsTableProps {
  /** Current page of hosts returned by the API (already sliced). */
  hosts: Host[];
  /** Total number of hosts across all pages, used to compute page count. */
  totalCount: number;
  /** Current active page (1-indexed), controlled by the parent. */
  page: number;
  /** Number of rows per page — must match what the API was called with. */
  pageSize?: number;
  /** Called whenever the user clicks a page control. Fetch the new page in the parent. */
  onPageChange: (page: number) => void;
  /** Pass true while the API request is in-flight to show a loading overlay. */
  isLoading?: boolean;

  tableTitle: string;

  tableSort: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < full ? "#e9a825" : "#d1d5db", fontSize: 13 }}>
          ★
        </span>
      ))}
    </span>
  );
}

function ScoreBar({ score, min, max }: { score: number; min: number; max: number }) {
  const pct = max === min ? 100 : Math.min(100, ((score - min) / (max - min)) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 4,
          background: "#e5e7eb",
          borderRadius: 2,
          minWidth: 60,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct.toFixed(1)}%`,
            height: "100%",
            background: "#3b82f6",
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, minWidth: 42, textAlign: "right" }}>
        {score.toFixed(3)}
      </span>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const palettes: [string, string][] = [
    ["#dbeafe", "#1d4ed8"],
    ["#dcfce7", "#15803d"],
    ["#fef3c7", "#b45309"],
    ["#fce7f3", "#be185d"],
    ["#ede9fe", "#6d28d9"],
  ];
  const idx = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % palettes.length;
  const [bg, color] = palettes[idx];
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: bg,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

function PaginationButton({
  onClick,
  disabled,
  active,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        minWidth: 34,
        height: 34,
        padding: "0 10px",
        border: "1px solid",
        borderColor: active ? "#3b82f6" : "#e5e7eb",
        borderRadius: 8,
        background: active ? "#3b82f6" : "white",
        color: active ? "white" : disabled ? "#9ca3af" : "#374151",
        fontSize: 13,
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s",
        lineHeight: 1,
      }}
    >
      {children}
    </button>
  );
}

export default function HostsTable({
  hosts,
  totalCount,
  page,
  pageSize = 10,
  onPageChange,
  isLoading = false,
  tableSort,
  tableTitle
}: HostsTableProps) {
  const scores = hosts.map((h) => h.score ?? 0).filter(Boolean);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  const totalPages = Math.ceil(totalCount / pageSize);
  const globalOffset = (page - 1) * pageSize;
  const rangeEnd = Math.min(globalOffset + pageSize, totalCount);

  const pageNumbers = useMemo<(number | "…")[]>(() => {
    const pages: (number | "…")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("…");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  }, [page, totalPages]);

  const thStyle: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#6b7280",
    borderBottom: "1px solid #f3f4f6",
    textAlign: "left",
    whiteSpace: "nowrap",
    background: "#fafafa",
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px 14px",
    fontSize: 14,
    color: "#111827",
    verticalAlign: "middle",
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "white",
        borderRadius: 12,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.6)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              border: "2px solid #e5e7eb",
              borderTopColor: "#3b82f6",
              borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Header bar */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #f3f4f6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#111827" }}>
            {tableTitle} 
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: "#6b7280", marginTop: 2 }}>
            {totalCount} hosts · sorted by {tableSort} 
          </p>
        </div>
        <span
          style={{
            fontSize: 12,
            color: "#6b7280",
            background: "#f3f4f6",
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          Page {page} of {totalPages}
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: 36 }}>#</th>
              <th style={thStyle}>Host</th>
              <th style={thStyle}>Listings</th>
              <th style={thStyle}>Rated</th>
              <th style={thStyle}>Avg rating</th>
              <th style={{ ...thStyle, minWidth: 160 }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {hosts.map((host, i) => {
              const rank = globalOffset + i + 1;
              return (
                <tr
                  key={host.host_name + rank}
                  style={{
                    borderBottom: i < hosts.length - 1 ? "1px solid #f9fafb" : "none",
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "transparent")
                  }
                >
                  <td style={{ ...tdStyle, color: "#9ca3af", fontSize: 12, fontWeight: 500 }}>
                    {rank}
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={host.host_name} />
                      <span style={{ fontWeight: 500 }}>{host.host_name}</span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontWeight: 500,
                        background: "#f3f4f6",
                        color: "#374151",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {host.listings_count}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, color: "#6b7280" }}>{host.rated_count ?? "—"}</td>
                  <td style={tdStyle}>
                    {host.average_rating != null ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <StarRating rating={host.average_rating} />
                        <span style={{ fontSize: 12, color: "#6b7280" }}>
                          {host.average_rating.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>—</span>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {host.score != null ? (
                      <ScoreBar score={host.score} min={minScore} max={maxScore} />
                    ) : (
                      <span style={{ color: "#9ca3af" }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid #f3f4f6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#fafafa",
        }}
      >
        <span style={{ fontSize: 13, color: "#6b7280" }}>
          Showing {globalOffset + 1}–{rangeEnd} of {totalCount}
        </span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <PaginationButton
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1 || isLoading}
          >
            ←
          </PaginationButton>
          {pageNumbers.map((p, i) =>
            p === "…" ? (
              <span
                key={`ellipsis-${i}`}
                style={{ padding: "0 4px", color: "#9ca3af", fontSize: 13 }}
              >
                …
              </span>
            ) : (
              <PaginationButton
                key={p}
                onClick={() => onPageChange(p as number)}
                active={page === p}
                disabled={isLoading}
              >
                {p}
              </PaginationButton>
            )
          )}
          <PaginationButton
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages || isLoading}
          >
            →
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}
