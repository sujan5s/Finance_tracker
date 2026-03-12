/**
 * Shared category icon + color mapping for all expense/income categories.
 * Used across Dashboard, Transactions, Budgets, and Recurring pages.
 */

export const CATEGORY_MAP = {
  // ── Expense categories ──
  Food:            { emoji: "🍔", color: "#f59e0b", bg: "rgba(245,158,11,0.15)"   },
  Transport:       { emoji: "🚗", color: "#3b82f6", bg: "rgba(59,130,246,0.15)"   },
  Shopping:        { emoji: "🛍️", color: "#a855f7", bg: "rgba(168,85,247,0.15)"   },
  Bills:           { emoji: "⚡", color: "#f97316", bg: "rgba(249,115,22,0.15)"   },
  Entertainment:   { emoji: "🎮", color: "#ec4899", bg: "rgba(236,72,153,0.15)"   },
  Health:          { emoji: "🏥", color: "#10b981", bg: "rgba(16,185,129,0.15)"   },
  Utilities:       { emoji: "💡", color: "#06b6d4", bg: "rgba(6,182,212,0.15)"    },
  Rent:            { emoji: "🏠", color: "#8b5cf6", bg: "rgba(139,92,246,0.15)"   },
  Subscription:    { emoji: "📺", color: "#ef4444", bg: "rgba(239,68,68,0.15)"    },
  Education:       { emoji: "📚", color: "#14b8a6", bg: "rgba(20,184,166,0.15)"   },
  Groceries:       { emoji: "🛒", color: "#84cc16", bg: "rgba(132,204,22,0.15)"   },
  Travel:          { emoji: "✈️", color: "#0ea5e9", bg: "rgba(14,165,233,0.15)"   },
  Dining:          { emoji: "🍽️", color: "#f43f5e", bg: "rgba(244,63,94,0.15)"    },

  // ── Income categories ──
  Salary:          { emoji: "💼", color: "#00d05e", bg: "rgba(0,208,94,0.15)"     },
  Freelance:       { emoji: "💻", color: "#22d3ee", bg: "rgba(34,211,238,0.15)"   },
  Investment:      { emoji: "📈", color: "#a3e635", bg: "rgba(163,230,53,0.15)"   },
  Business:        { emoji: "🏢", color: "#fbbf24", bg: "rgba(251,191,36,0.15)"   },
  Bonus:           { emoji: "🎁", color: "#f472b6", bg: "rgba(244,114,182,0.15)"  },
  Interest:        { emoji: "🏦", color: "#34d399", bg: "rgba(52,211,153,0.15)"   },

  // ── Fallback ──
  Other:           { emoji: "📦", color: "#6b7280", bg: "rgba(107,114,128,0.15)"  },
  General:         { emoji: "💳", color: "#6b7280", bg: "rgba(107,114,128,0.15)"  },
  Income:          { emoji: "💰", color: "#00d05e", bg: "rgba(0,208,94,0.15)"     },
};

/**
 * Get the icon info for a category. Falls back to Other if not found.
 */
export const getCategoryInfo = (category) => {
  return CATEGORY_MAP[category] || CATEGORY_MAP["Other"];
};

/**
 * CategoryBadge — compact pill with emoji and label.
 * Usage: <CategoryBadge category="Food" />
 */
export const CategoryBadge = ({ category }) => {
  const info = getCategoryInfo(category);
  return (
    <span style={{
      display:        "inline-flex",
      alignItems:     "center",
      gap:            5,
      padding:        "3px 9px",
      borderRadius:   5,
      fontSize:       12,
      fontWeight:     600,
      background:     info.bg,
      color:          info.color,
    }}>
      <span style={{ fontSize: 13 }}>{info.emoji}</span>
      {category || "Other"}
    </span>
  );
};

/**
 * CategoryIcon — round icon box with just the emoji.
 * Usage: <CategoryIcon category="Food" size={36} />
 */
export const CategoryIcon = ({ category, size = 36 }) => {
  const info = getCategoryInfo(category);
  return (
    <div style={{
      width:           size,
      height:          size,
      borderRadius:    size * 0.28,
      background:      info.bg,
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      fontSize:        size * 0.48,
      flexShrink:      0,
    }}>
      {info.emoji}
    </div>
  );
};

/** Bar-chart colour for a category */
export const getCategoryColor = (category) => {
  return (CATEGORY_MAP[category] || CATEGORY_MAP["Other"]).color;
};
