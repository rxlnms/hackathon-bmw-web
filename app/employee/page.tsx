"use client";

import { useEffect, useState} from "react";
import data from "@/data.json";

export default function EmployeePage({ params }: { params: { id: string } }) {
    const [insight, setInsight] = useState("");
    const [loading, setLoading] = useState(false);

    const employee = data.find(
        (e) => e.employee_id === Number(params.id)
    );

    const handleAnalyze  = async () => {
        setLoading(true);

        const res = await fetch("api/insight", {
            method: "POST",
            headers: {
                "Content_Type": "application/json",
            },
            body: JSON.stringify({employee}),
        });

        const result = await res.json();
        setInsight(result.text);
        setLoading(false);
    };

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">{employee?.name}</h1>
            <p className="text-gray-500">{employee?.role}</p>

            <div className="mt-4">
                <p>KPI Score: {employee?.kpi_star_score}</p>
                <p>Invisible Work: {employee?.invisible_work_score}</p>
            </div>
            <button
                onClick={handleAnalyze}
                className="mt-6 px-4 py-2 bg-black text-white rounded-xl"
            >
                Analyze with AI
            </button>
            {loading && <p className="mt-4">Analyzing...</p>}

            {insight && (
                <div className="mt-6 border p-4 rounded-xl">
                    <h2 className="font-semibold mb-2">AI Insight</h2>
                    <p>{insight}</p>
                </div>
            )}
        </main>
    );
}