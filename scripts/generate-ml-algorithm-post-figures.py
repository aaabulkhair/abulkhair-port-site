#!/usr/bin/env python3
"""Generate the figures for the blog post "How to Choose a Machine Learning Algorithm".

All figures are rendered in the site's dark editorial theme (see tailwind.config.js)
and written to public/images/posts/how-to-choose-machine-learning-algorithm/.

Run with the system python3 (matplotlib + scikit-learn + numpy required):
    python3 scripts/generate-ml-algorithm-post-figures.py
"""

import os

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.colors import ListedColormap
from matplotlib.patches import FancyBboxPatch
from sklearn.datasets import make_blobs, make_circles, make_moons
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier

# --- Site theme tokens (tailwind.config.js) ---------------------------------

BG = "#0a0a0a"
SURFACE = "#101010"
TEXT = "#f0f0f0"
TEXT_SECONDARY = "#9e9e9e"  # ~ rgba(255,255,255,0.62)
TEXT_MUTED = "#737373"  # ~ rgba(255,255,255,0.45)
ACCENT = "#e8c47c"
CLASS_B = "#7ca8e8"  # cool blue counterpoint to the gold accent
RULE = "#1f1f1f"

OUT_DIR = os.path.join(
    os.path.dirname(__file__),
    "..",
    "public",
    "images",
    "posts",
    "how-to-choose-machine-learning-algorithm",
)

plt.rcParams.update(
    {
        "figure.facecolor": BG,
        "axes.facecolor": BG,
        "axes.edgecolor": RULE,
        "axes.labelcolor": TEXT_SECONDARY,
        "text.color": TEXT,
        "xtick.color": TEXT_MUTED,
        "ytick.color": TEXT_MUTED,
        "font.size": 11,
        "savefig.facecolor": BG,
    }
)

# --- Typography: match the site (Inter body, Fraunces editorial serif) --------

FONT_DIR = os.path.join(os.path.dirname(__file__), "fonts")
SERIF = "sans-serif"
if os.path.isdir(FONT_DIR):
    from matplotlib import font_manager

    for fname in sorted(os.listdir(FONT_DIR)):
        if fname.endswith(".ttf"):
            font_manager.fontManager.addfont(os.path.join(FONT_DIR, fname))
    plt.rcParams["font.family"] = "Inter"
    SERIF = "Fraunces"


def tracked(s):
    """Letter-spaced overline text (matplotlib has no tracking)."""
    return "   ".join(" ".join(w) for w in s.split())


def style_axes(ax, grid=False):
    for spine in ax.spines.values():
        spine.set_color(RULE)
    if grid:
        ax.grid(True, color=RULE, linewidth=0.6, alpha=0.7)
    ax.tick_params(length=0)


# --- Shared toy data ---------------------------------------------------------

def toy_datasets():
    rng = np.random.RandomState(42)
    return [
        ("moons", make_moons(n_samples=220, noise=0.28, random_state=42)),
        ("circles", make_circles(n_samples=220, noise=0.18, factor=0.5, random_state=42)),
        ("blobs", make_blobs(n_samples=220, centers=2, cluster_std=1.6, random_state=rng)),
    ]


def classifiers():
    return [
        ("Logistic\nRegression", LogisticRegression(max_iter=2000)),
        ("Linear\nSVM", SVC(kernel="linear", C=1.0)),
        ("Decision\nTree", DecisionTreeClassifier(max_depth=5, random_state=42)),
        ("Random\nForest", RandomForestClassifier(max_depth=5, n_estimators=50, random_state=42)),
        ("KNN", KNeighborsClassifier(n_neighbors=7)),
        ("RBF\nSVM", SVC(kernel="rbf", gamma=2, C=1.0)),
        ("Neural\nNetwork", MLPClassifier(hidden_layer_sizes=(64, 32), alpha=1.0, max_iter=3000, random_state=42)),
    ]


REGION_CMAP = ListedColormap(["#3d3421", "#1f2c40"])
POINT_COLORS = {0: ACCENT, 1: CLASS_B}


def draw_boundary(ax, clf, X, y):
    """Fit clf and draw its decision regions + data points on ax."""
    X = StandardScaler().fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=42)
    clf.fit(X_train, y_train)
    score = clf.score(X_test, y_test)

    x_min, x_max = X[:, 0].min() - 0.5, X[:, 0].max() + 0.5
    y_min, y_max = X[:, 1].min() - 0.5, X[:, 1].max() + 0.5
    xx, yy = np.meshgrid(np.linspace(x_min, x_max, 300), np.linspace(y_min, y_max, 300))
    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)

    ax.contourf(xx, yy, Z, cmap=REGION_CMAP, alpha=0.9, levels=1)
    for cls, color in POINT_COLORS.items():
        train_mask = y_train == cls
        test_mask = y_test == cls
        ax.scatter(X_train[train_mask, 0], X_train[train_mask, 1], c=color, s=7, alpha=0.45, linewidths=0)
        ax.scatter(X_test[test_mask, 0], X_test[test_mask, 1], c=color, s=12, alpha=0.95, linewidths=0)
    ax.set_xlim(xx.min(), xx.max())
    ax.set_ylim(yy.min(), yy.max())
    ax.set_xticks(())
    ax.set_yticks(())
    return score


# --- Figure 1: cover (1200x630, OG-ready) -------------------------------------

def figure_cover():
    fig, ax = plt.subplots(figsize=(12, 6.3), dpi=100)
    fig.subplots_adjust(left=0, right=1, top=1, bottom=0)

    X, y = make_moons(n_samples=400, noise=0.22, random_state=7)
    X = StandardScaler().fit_transform(X)
    clf = SVC(kernel="rbf", gamma=2, C=1.0).fit(X, y)

    x_min, x_max = X[:, 0].min() - 0.8, X[:, 0].max() + 0.8
    y_min, y_max = X[:, 1].min() - 1.2, X[:, 1].max() + 1.2
    xx, yy = np.meshgrid(np.linspace(x_min, x_max, 500), np.linspace(y_min, y_max, 500))
    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
    ax.contourf(xx, yy, Z, cmap=REGION_CMAP, alpha=0.85, levels=1)
    ax.contour(xx, yy, Z, colors=[ACCENT], linewidths=1.4, levels=[0.5], alpha=0.9)
    for cls, color in POINT_COLORS.items():
        ax.scatter(X[y == cls, 0], X[y == cls, 1], c=color, s=14, alpha=0.75, linewidths=0)
    ax.set_xlim(xx.min(), xx.max())
    ax.set_ylim(yy.min(), yy.max())
    ax.axis("off")

    # Dim scrim behind the title block for legibility.
    ax.add_patch(plt.Rectangle((x_min, y_min), (x_max - x_min) * 0.62, (y_max - y_min),
                               color=BG, alpha=0.82, zorder=5))

    ax.text(x_min + 0.35, y_min + (y_max - y_min) * 0.66,
            "How to Choose a\nMachine Learning\nAlgorithm",
            fontsize=34, fontfamily=SERIF, fontweight="bold", color=TEXT,
            va="center", zorder=6, linespacing=1.25)
    ax.text(x_min + 0.37, y_min + (y_max - y_min) * 0.30,
            "A field guide · abulkhair.ai",
            fontsize=15, color=ACCENT, va="center", zorder=6)

    fig.savefig(os.path.join(OUT_DIR, "cover.png"))
    plt.close(fig)


# --- Figure 2: decision-boundary grid ----------------------------------------

def figure_decision_boundaries():
    datasets = toy_datasets()
    clfs = classifiers()
    n_rows, n_cols = len(datasets), len(clfs)

    fig, axes = plt.subplots(n_rows, n_cols, figsize=(16, 7.2), dpi=160)
    fig.subplots_adjust(left=0.055, right=0.995, top=0.90, bottom=0.02, wspace=0.06, hspace=0.10)

    for row, (ds_name, (X, y)) in enumerate(datasets):
        for col, (clf_name, clf) in enumerate(clfs):
            ax = axes[row, col]
            score = draw_boundary(ax, clf, X, y)
            style_axes(ax)
            if row == 0:
                ax.set_title(clf_name, fontsize=10.5, color=TEXT, pad=8)
            if col == 0:
                ax.set_ylabel(ds_name, fontsize=10.5, color=TEXT_SECONDARY, rotation=90)
            ax.text(0.97, 0.04, f"{score:.2f}", transform=ax.transAxes,
                    fontsize=7.5, color=TEXT_MUTED, ha="right", va="bottom")

    fig.suptitle(
        "The same three datasets, seven algorithms — each draws a different kind of boundary",
        fontsize=14, color=TEXT, x=0.525, y=0.985, fontfamily=SERIF, fontweight=600,
    )
    fig.savefig(os.path.join(OUT_DIR, "decision-boundaries.png"))
    plt.close(fig)


# --- Figure 3: model family map ----------------------------------------------

FAMILIES = [
    (
        "Linear in the\ninput features",
        "Prediction = weighted sum of\nyour features, nothing else.",
        ["Linear Regression", "Logistic Regression", "Linear SVM"],
        "scale before you regularize",
        LogisticRegression(max_iter=2000),
    ),
    (
        "Tree-based",
        "If-then splits carve the\nfeature space into boxes.",
        ["Decision Tree", "Random Forest", "XGBoost / LightGBM", "CatBoost / AdaBoost"],
        "immune to scaling and skew",
        DecisionTreeClassifier(max_depth=4, random_state=42),
    ),
    (
        "Distance-based",
        "Class of a point follows\nthe points closest to it.",
        ["K-Nearest Neighbors"],
        "standardize first — scale is the metric",
        KNeighborsClassifier(n_neighbors=7),
    ),
    (
        "Learned feature space",
        "Linear in features the model\ninvents — curved in yours.",
        ["Neural Networks", "Kernel SVM (RBF)"],
        "hungry for data, stingy with explanations",
        SVC(kernel="rbf", gamma=2, C=1.0),
    ),
]


def draw_glyph(ax, clf, X, y):
    """Small fitted-boundary window: the family's vocabulary on the same moons."""
    clf.fit(X, y)
    x_min, x_max = X[:, 0].min() - 0.4, X[:, 0].max() + 0.4
    y_min, y_max = X[:, 1].min() - 0.4, X[:, 1].max() + 0.4
    xx, yy = np.meshgrid(np.linspace(x_min, x_max, 240), np.linspace(y_min, y_max, 240))
    Z = clf.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
    ax.contourf(xx, yy, Z, cmap=REGION_CMAP, alpha=0.9, levels=1)
    ax.contour(xx, yy, Z, colors=[ACCENT], linewidths=1.1, levels=[0.5], alpha=0.9)
    for cls, color in POINT_COLORS.items():
        m = y == cls
        ax.scatter(X[m, 0], X[m, 1], c=color, s=5, alpha=0.55, linewidths=0)
    ax.set_xlim(xx.min(), xx.max())
    ax.set_ylim(yy.min(), yy.max())
    ax.set_xticks(())
    ax.set_yticks(())
    for spine in ax.spines.values():
        spine.set_color(RULE)


def figure_family_map():
    fig, ax = plt.subplots(figsize=(13.4, 8.6), dpi=160)
    fig.subplots_adjust(left=0, right=1, top=1, bottom=0)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis("off")

    ax.text(2.8, 96.4, tracked("MODEL FAMILIES"),
            fontsize=8.5, color=TEXT_MUTED, fontweight=600)
    ax.text(2.7, 91.4, "Four families, four ways to draw a boundary",
            fontsize=19, color=TEXT, fontfamily=SERIF, fontweight=600, va="center")
    ax.plot([2.8, 19.5], [87.4, 87.4], color=ACCENT, linewidth=1.0, alpha=0.85)
    ax.text(97.3, 96.6, "One dataset.\nFour different cuts.",
            ha="right", va="top", fontsize=9, color=TEXT_MUTED, linespacing=1.55)

    # One dataset for all four glyphs — difference reads as vocabulary, not data.
    X, y = make_moons(n_samples=200, noise=0.25, random_state=42)
    X = StandardScaler().fit_transform(X)

    n = len(FAMILIES)
    margin, gap = 2.5, 2.0
    width = (100 - 2 * margin - (n - 1) * gap) / n
    top, bottom = 84.5, 23.0

    for i, (name, blurb, algos, aside, clf) in enumerate(FAMILIES):
        x = margin + i * (width + gap)
        box = FancyBboxPatch((x, bottom), width, top - bottom,
                             boxstyle="round,pad=0.6,rounding_size=1.6",
                             facecolor=SURFACE, edgecolor=RULE, linewidth=1.2)
        ax.add_patch(box)

        gw, gh = width - 5.0, 20.0
        gax = fig.add_axes([(x + (width - gw) / 2) / 100, (top - 2.4 - gh) / 100,
                            gw / 100, gh / 100])
        draw_glyph(gax, clf, X, y)

        ax.text(x + width / 2, 56.6, name, ha="center", va="center",
                fontsize=12, color=ACCENT, fontfamily=SERIF, fontweight=600,
                linespacing=1.25)
        ax.text(x + width / 2, 48.6, blurb, ha="center", va="center",
                fontsize=8.8, color=TEXT_SECONDARY, linespacing=1.45)
        for j, algo in enumerate(algos):
            ax.text(x + width / 2, 41.2 - j * 5.0, algo, ha="center", va="center",
                    fontsize=9.4, color=TEXT)
        ax.text(x + width / 2, 20.0, aside, ha="center", va="center",
                fontsize=8.8, color=TEXT_MUTED, fontfamily=SERIF, fontstyle="italic")

    # Naive Bayes: literally outside the map, held at a dashed remove.
    nb = FancyBboxPatch((18, 5.0), 64, 11.5,
                        boxstyle="round,pad=0.6,rounding_size=1.6",
                        facecolor=BG, edgecolor=TEXT_MUTED, linewidth=1.0,
                        linestyle=(0, (5, 4)), alpha=0.9)
    ax.add_patch(nb)
    ax.text(50, 13.2, "Naive Bayes — probabilistic, outside the map",
            ha="center", va="center", fontsize=10.5, color=TEXT, fontweight=600)
    ax.text(50, 8.6,
            "No boundary vocabulary of its own: it scores each class with Bayes' theorem. With Gaussian,\n"
            "equal-variance features it is linear in the log-odds — borrowing the first card's shape rather than owning one.",
            ha="center", va="center", fontsize=8.8, color=TEXT_MUTED, linespacing=1.45)

    fig.savefig(os.path.join(OUT_DIR, "model-family-map.png"))
    plt.close(fig)


# --- Figure 4: interpretability vs predictive power ---------------------------

TRADEOFF_MODELS = [
    # name, predictive power (x), interpretability (y), on the frontier?
    ("Linear / Logistic\nRegression", 0.30, 0.95, True),
    ("Naive Bayes", 0.22, 0.88, False),
    ("Decision Tree", 0.42, 0.90, True),
    ("KNN", 0.45, 0.62, False),
    ("Random Forest", 0.74, 0.42, True),
    ("Gradient Boosting\n(XGBoost, LightGBM)", 0.86, 0.30, True),
    ("Kernel SVM", 0.72, 0.22, False),
    ("Neural Network", 0.95, 0.10, True),
]

GB = "Gradient Boosting\n(XGBoost, LightGBM)"


def figure_tradeoff():
    from scipy.interpolate import PchipInterpolator

    fig, ax = plt.subplots(figsize=(13.4, 7.6), dpi=160)
    fig.subplots_adjust(left=0.075, right=0.965, top=0.845, bottom=0.115)

    fig.text(0.045, 0.952, tracked("MODEL SELECTION"),
             fontsize=8.5, color=TEXT_MUTED, fontweight=600)
    fig.text(0.044, 0.888, "The trade-off no dataset can settle for you",
             fontsize=19, color=TEXT, fontfamily=SERIF, fontweight=600)
    fig.text(0.962, 0.955, "Pick a point on the curve.\nYou cannot pick both ends.",
             ha="right", va="top", fontsize=9, color=TEXT_MUTED, linespacing=1.55)

    ax.set_xlim(0, 1.08)
    ax.set_ylim(0, 1.06)
    ax.set_xticks([])
    ax.set_yticks([])
    style_axes(ax)

    # The Pareto frontier the models sit along — the figure's actual argument.
    fx = np.array([0.24, 0.30, 0.42, 0.74, 0.86, 0.95, 1.04])
    fy = np.array([1.00, 0.95, 0.90, 0.42, 0.30, 0.10, 0.02])
    curve = PchipInterpolator(fx, fy)
    xs = np.linspace(0.24, 1.04, 300)
    ax.fill_between(xs, curve(xs) - 0.05, curve(xs) + 0.05,
                    color=ACCENT, alpha=0.06, linewidth=0, zorder=0)
    p = ax.transData.transform(np.array([[0.55, curve(0.55)], [0.59, curve(0.59)]]))
    ang = np.degrees(np.arctan2(p[1, 1] - p[0, 1], p[1, 0] - p[0, 0]))
    ax.text(0.57, curve(0.57) + 0.025, "the frontier: more power, less explanation",
            rotation=ang, rotation_mode="anchor", ha="center", va="bottom",
            fontsize=9.3, fontfamily=SERIF, fontstyle="italic",
            color=ACCENT, alpha=0.65)

    # (dx, dy, ha, va); Gradient Boosting handled separately below.
    label_pos = {
        "Linear / Logistic\nRegression": (0, -0.045, "center", "top"),
        "Naive Bayes": (0, -0.045, "center", "top"),
        "Decision Tree": (0, 0.04, "center", "bottom"),
        "KNN": (0, 0.04, "center", "bottom"),
        "Random Forest": (0, 0.04, "center", "bottom"),
        "Kernel SVM": (-0.032, 0, "right", "center"),
        "Neural Network": (-0.032, 0, "right", "center"),
    }
    for name, x, yv, frontier in TRADEOFF_MODELS:
        if name == GB:
            continue
        if frontier:
            ax.scatter(x, yv, s=95, color=ACCENT, zorder=5,
                       edgecolors=BG, linewidths=1.2)
            label_color = TEXT
        else:
            ax.scatter(x, yv, s=70, color=CLASS_B, alpha=0.8, zorder=4,
                       linewidths=0)
            label_color = TEXT_MUTED
        dx, dy, ha, va = label_pos[name]
        ax.text(x + dx, yv + dy, name, fontsize=9.2, color=label_color,
                ha=ha, va=va, linespacing=1.25, zorder=6)

    # Gradient boosting: ringed marker, gold serif name, and an annotation
    # block in the otherwise-empty lower-left with a dashed leader line.
    ax.scatter(0.86, 0.30, s=820, facecolors="none", edgecolors=ACCENT,
               alpha=0.15, linewidths=1.1, zorder=4)
    ax.scatter(0.86, 0.30, s=380, facecolors="none", edgecolors=ACCENT,
               alpha=0.35, linewidths=1.1, zorder=4)
    ax.scatter(0.86, 0.30, s=120, color=ACCENT, zorder=5,
               edgecolors=BG, linewidths=1.2)
    ax.text(0.895, 0.30, "Gradient Boosting", fontsize=11, color=ACCENT,
            fontfamily=SERIF, fontweight=600, ha="left", va="center", zorder=6)

    ax.plot([0.045, 0.045], [0.10, 0.305], color=ACCENT, linewidth=2.0)
    ax.text(0.062, 0.305, tracked("THE USUAL SWEET SPOT"),
            fontsize=8, color=ACCENT, fontweight=600, va="top")
    ax.text(0.062, 0.268, "Gradient Boosting", fontsize=10.5, color=TEXT,
            fontweight=600, va="top")
    ax.text(0.062, 0.228, "XGBoost, LightGBM", fontsize=9, color=TEXT_MUTED,
            va="top")
    ax.text(0.062, 0.182,
            "Strongest on structured data — and with\n"
            "SHAP you get decent post-hoc explanations back.",
            fontsize=9, color=TEXT_SECONDARY, va="top", linespacing=1.5)
    ax.annotate("", xy=(0.842, 0.297), xytext=(0.33, 0.288),
                arrowprops=dict(arrowstyle="-|>", color=TEXT_MUTED,
                                lw=1.0, linestyle=(0, (4, 4))))

    # Margin notes: the corners speak for themselves.
    ax.text(0.025, 0.975, '"white-box" — every prediction can be explained',
            fontsize=9.8, color=TEXT_MUTED, ha="left", va="top",
            fontfamily=SERIF, fontstyle="italic")
    ax.text(1.055, 0.975, "everyone wants this corner —\nno model lives here",
            fontsize=9.8, color=TEXT_MUTED, ha="right", va="top",
            fontfamily=SERIF, fontstyle="italic", linespacing=1.4)
    ax.text(1.055, 0.025, '"black-box" — accuracy you cannot easily explain',
            fontsize=9.8, color=TEXT_MUTED, ha="right", va="bottom",
            fontfamily=SERIF, fontstyle="italic")

    from matplotlib.lines import Line2D

    handles = [
        Line2D([], [], marker="o", linestyle="None", markersize=6.5,
               markerfacecolor=ACCENT, markeredgecolor=BG, label="on the frontier"),
        Line2D([], [], marker="o", linestyle="None", markersize=6,
               markerfacecolor=CLASS_B, markeredgecolor="none",
               label="inside it — something else does better on both"),
    ]
    ax.legend(handles=handles, loc="upper left", bbox_to_anchor=(0.0, -0.03),
              ncol=2, frameon=False, fontsize=8.5, labelcolor=TEXT_MUTED,
              handletextpad=0.3, columnspacing=1.6, borderaxespad=0)

    ax.set_xlabel("Predictive power on structured data →", fontsize=11,
                  labelpad=10, loc="right")
    ax.set_ylabel("Interpretability →", fontsize=11, labelpad=10)

    fig.savefig(os.path.join(OUT_DIR, "interpretability-tradeoff.png"))
    plt.close(fig)


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    figure_cover()
    print("cover.png")
    figure_decision_boundaries()
    print("decision-boundaries.png")
    figure_family_map()
    print("model-family-map.png")
    figure_tradeoff()
    print("interpretability-tradeoff.png")
    print(f"Done -> {os.path.abspath(OUT_DIR)}")
