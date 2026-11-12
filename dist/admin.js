import { CmsError as e, boot as t, invalidate as n, locale as r, navigate as i, registry as a, t as o, xsrfToken as s } from "@letterncms/sdk";
import { lazy as c, useEffect as l, useRef as u } from "react";
import { toast as d } from "@letterncms/ui";
import { jsx as f } from "react/jsx-runtime";
// admin/src/UploadAction.tsx
function p(n, i) {
	return new Promise((a, c) => {
		let l = new XMLHttpRequest(), u = new FormData();
		u.append("file", n), l.open("POST", `${t.api}/import/upload`), l.setRequestHeader("X-XSRF-TOKEN", s() ?? ""), l.setRequestHeader("Accept", "application/json"), l.setRequestHeader("X-Cms-Locale", r()), l.upload.onprogress = (e) => e.lengthComputable && i(e.loaded / e.total), l.onload = () => {
			let t = (() => {
				try {
					return JSON.parse(l.responseText);
				} catch {
					return null;
				}
			})();
			l.status >= 200 && l.status < 300 && t?.data ? a(t.data) : c(new e(t?.error?.message ?? (l.status === 413 ? o("The file is larger than the server allows.") : o("Upload failed ({status})", { status: l.status })), t?.error?.type ?? "failed", l.status));
		}, l.onerror = () => c(new e(o("Network error during upload."))), l.send(u);
	});
}
function m({ close: e }) {
	let t = u(null);
	return l(() => {
		let n = t.current;
		if (!n) return;
		let r = () => e?.();
		return n.addEventListener("cancel", r), n.click(), () => n.removeEventListener("cancel", r);
	}, []), /* @__PURE__ */ f("input", {
		ref: t,
		type: "file",
		accept: ".xml,.csv,.tsv,.zip",
		className: "hidden",
		onChange: async (t) => {
			let r = t.target.files?.[0];
			if (e?.(), !r) return;
			let a = o("Uploading {name}…", { name: r.name }), s = d.loading(a, { description: "0%" });
			try {
				let e = await p(r, (e) => d.loading(a, {
					id: s,
					description: `${Math.round(e * 100)}%`
				}));
				n("import"), d.success(o("{name} uploaded", { name: e.path }), {
					id: s,
					description: void 0
				}), i(`/import/files/${e.id}`);
			} catch (e) {
				d.dismiss(s), d.error(o("Couldn’t upload {name}: {reason}", {
					name: r.name,
					reason: e instanceof Error ? e.message : String(e)
				}));
			}
		}
	});
}
a.components.set("import/upload", m), a.components.set("import/progress", c(() => import("./chunks/Progress-DUNf49Vb.js")));
