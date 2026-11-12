import { CmsError as e, queryClient as t, run as n, t as r, useAbility as i } from "@letterncms/sdk";
import { useEffect as a, useState as o } from "react";
import { Button as s, Meter as c, QueryError as l, Stat as u, toast as d } from "@letterncms/ui";
import { jsx as f, jsxs as p } from "react/jsx-runtime";
// admin/src/Progress.tsx
function m({ props: m }) {
	let { id: h } = m, g = i("import-runs/get", {
		id: h,
		perPage: 1
	}, { refetchOnWindowFocus: !1 }), [_, v] = o(null), [y, b] = o(null), [x, S] = o(0), [C, w] = o(!1), T = _ ?? g.data ?? null;
	a(() => {
		let e = !0;
		return b(null), (async () => {
			let r = -1;
			for (; e;) try {
				let i = await n("import-runs/step", { id: h });
				if (!e) return;
				if (v(i), i.status === "running" && i.done === r && await new Promise((e) => setTimeout(e, 1e3)), r = i.done, i.status !== "running") {
					t.invalidateQueries();
					return;
				}
			} catch (t) {
				e && b(t);
				return;
			}
		})(), () => {
			e = !1;
		};
	}, [h, x]);
	let E = async () => {
		w(!0);
		try {
			await n("import-runs/cancel", { id: h }), t.invalidateQueries();
		} catch (e) {
			d.error(e), w(!1);
		}
	};
	if (y) return /* @__PURE__ */ f(l, {
		title: r("The import stopped"),
		message: y instanceof e ? y.message : void 0,
		onRetry: () => S((e) => e + 1)
	});
	let D = T && T.records > 0 ? T.done / T.records : 0, O = T ? r("{done} of {total} entries", {
		done: T.done.toLocaleString(),
		total: T.records.toLocaleString()
	}) : r("Starting…");
	return /* @__PURE__ */ p("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ p("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ p("div", {
					className: "flex items-baseline justify-between gap-4 text-sm",
					children: [/* @__PURE__ */ f("span", {
						className: "font-medium text-ink",
						children: r("Importing")
					}), /* @__PURE__ */ f("span", {
						className: "tabular-nums text-muted",
						"aria-live": "polite",
						children: O
					})]
				}), /* @__PURE__ */ f(c, {
					value: D,
					label: O
				})]
			}),
			/* @__PURE__ */ p("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ f(u, {
						size: "sm",
						label: r("Created"),
						value: (T?.summary.create ?? 0).toLocaleString()
					}),
					/* @__PURE__ */ f(u, {
						size: "sm",
						label: r("Updated"),
						value: (T?.summary.update ?? 0).toLocaleString()
					}),
					/* @__PURE__ */ f(u, {
						size: "sm",
						label: r("Unchanged"),
						value: (T?.summary.skip ?? 0).toLocaleString()
					}),
					/* @__PURE__ */ f(u, {
						size: "sm",
						label: r("Failed"),
						value: (T?.summary.failed ?? 0).toLocaleString()
					})
				]
			}),
			/* @__PURE__ */ f(s, {
				onClick: () => void E(),
				loading: C,
				children: r("Cancel Import")
			})
		]
	});
}
export { m as default };
