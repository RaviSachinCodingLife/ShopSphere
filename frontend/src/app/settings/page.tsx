"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { PREFS } from "@/graphql/queries";

export default function Settings() {
    const [theme, setTheme] = useState("light");
    const [notifications, setNotifications] = useState(true);
    const [mutate, { data, loading, error }] = useMutation(PREFS);

    return (
        <div className="space-y-6 max-w-xl">
            <h1 className="text-2xl font-semibold">Admin Settings</h1>
            <div className="rounded-2xl bg-white p-5 shadow space-y-4">
                <div className="space-y-2">
                    <label className="text-sm text-slate-500">Theme</label>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)} className="border rounded-md px-3 py-2">
                        <option value="light">Light</option>
                        <option value="dark">Dark (UI only)</option>
                        <option value="system">System</option>
                    </select>
                </div>
                <div className="flex items-center gap-3">
                    <input id="notif" type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                    <label htmlFor="notif">Enable notifications</label>
                </div>
                <button disabled={loading} className="px-4 py-2 rounded-md border"
                    onClick={() => mutate({ variables: { theme, notifications } })}>
                    {loading ? "Saving..." : "Save"}
                </button>
                {error && <div className="text-red-600 text-sm">{String(error)}</div>}
                {data?.updatePreference && <div className="text-green-600 text-sm">Saved!</div>}
            </div>
        </div>
    );
}
