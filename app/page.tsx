"use client";

import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState({
    initialAmount: "",
    monthlyDeposit: "",
    interestRate: "",
    years: "",
  });

  const [result, setResult] = useState<{ futureValue: string | null; contribution: string | null }>({ futureValue: null, contribution: null });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Remove commas and validate as numeric
    const numericValue = value.replace(/,/g, "");
    if (!/^\d*$/.test(numericValue)) return;

    // Format with commas for readability
    const formattedValue = new Intl.NumberFormat("en-KE").format(Number(numericValue) || 0);

    setInputs((prev) => ({ ...prev, [name]: numericValue }));
    e.target.value = formattedValue;
  };

  const calculateCompoundInterest = () => {
    const { initialAmount, monthlyDeposit, interestRate, years } = inputs;

    const principal = parseFloat(initialAmount) || 0;
    const deposit = parseFloat(monthlyDeposit) || 0;
    const rate = parseFloat(interestRate) / 100 || 0; // Convert APR to decimal
    const t = parseFloat(years) || 0;

    const n = 12; // Monthly compounding

    // Future value of principal
    const futurePrincipal = principal * Math.pow(1 + rate / n, n * t);

    // Future value of monthly deposits
    const futureDeposits =
      deposit *
      ((Math.pow(1 + rate / n, n * t) - 1) / (rate / n)) *
      (1 + rate / n);

    // Total future value
    const futureValue = Math.round(futurePrincipal + futureDeposits);

    // Total contribution (initial + all deposits)
    const contribution = Math.round(principal + deposit * t * 12);

    setResult({
      futureValue: new Intl.NumberFormat("en-KE").format(futureValue),
      contribution: new Intl.NumberFormat("en-KE").format(contribution),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-extrabold mb-6 text-center text-blue-600">
          Compound Interest Calculator
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            name="initialAmount"
            placeholder="Initial Amount (KES)"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="monthlyDeposit"
            placeholder="Monthly Deposit (KES)"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="interestRate"
            placeholder="Interest Rate (APR in %)"
            value={inputs.interestRate}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, interestRate: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            name="years"
            placeholder="Duration (Years)"
            value={inputs.years}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, years: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={calculateCompoundInterest}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Calculate
          </button>
        </div>
        {result.futureValue && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 text-center">Results</h2>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold text-green-600">
                Future Value: <span className="font-bold">KES {result.futureValue}</span>
              </p>
              <p className="text-lg font-medium text-gray-700">
                Total Contribution: <span className="font-bold">KES {result.contribution}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}