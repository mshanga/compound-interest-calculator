"use client";

import React, { useState } from "react";

const CompoundInterestCalculator = () => {
  const [inputs, setInputs] = useState({
    initialAmount: "",
    monthlyDeposit: "",
    interestRate: "",
    years: "",
  });

  const [result, setResult] = useState({
    totalContribution: "",
    futureValue: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Remove commas for parsing and store clean value
    const formattedValue = value.replace(/,/g, "");

    // Update state
    setInputs({ ...inputs, [name]: formattedValue });
  };

  const calculateCompoundInterest = () => {
    const { initialAmount, monthlyDeposit, interestRate, years } = inputs;

    // Parse values and handle empty fields
    const principal = initialAmount ? parseFloat(initialAmount.replace(/,/g, "")) : 0;
    const deposit = monthlyDeposit ? parseFloat(monthlyDeposit.replace(/,/g, "")) : 0;
    const rate = interestRate ? parseFloat(interestRate) / 100 : 0; // Convert APR to decimal
    const t = years ? parseFloat(years) : 0;

    const n = 12; // Monthly compounding frequency

    // Future value of principal (compounded annually)
    const futurePrincipal = principal * Math.pow(1 + rate, t);

    // Future value of monthly deposits (compounded monthly)
    const futureDeposits =
      deposit > 0
        ? deposit *
          ((Math.pow(1 + rate / n, n * t) - 1) / (rate / n)) *
          (1 + rate / n)
        : 0;

    // Total future value
    const futureValue = futurePrincipal + futureDeposits;

    // Total contribution (initial amount + all deposits made)
    const totalContribution = principal + deposit * n * t;

    // Update results with formatted values
    setResult({
      totalContribution: formatNumber(totalContribution),
      futureValue: formatNumber(futureValue),
    });
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(Math.round(num));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-blue-500 mb-4 text-center">
          Compound Interest Calculator
        </h1>
        <div className="space-y-4">
          {/* Initial Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Initial Amount (KES)
            </label>
            <input
              type="text"
              name="initialAmount"
              value={
                inputs.initialAmount
                  ? new Intl.NumberFormat().format(
                      inputs.initialAmount.replace(/,/g, "")
                    )
                  : ""
              }
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900"
              placeholder="Enter initial amount"
            />
          </div>

          {/* Monthly Deposit */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Monthly Deposit (KES)
            </label>
            <input
              type="text"
              name="monthlyDeposit"
              value={
                inputs.monthlyDeposit
                  ? new Intl.NumberFormat().format(
                      inputs.monthlyDeposit.replace(/,/g, ""
                      )
                    )
                  : ""
              }
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900"
              placeholder="Enter monthly deposit"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interest Rate (APR %)
            </label>
            <input
              type="text"
              name="interestRate"
              value={inputs.interestRate || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900"
              placeholder="Enter interest rate"
            />
          </div>

          {/* Duration in Years */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (Years)
            </label>
            <input
              type="text"
              name="years"
              value={inputs.years || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-gray-900"
              placeholder="Enter duration in years"
            />
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateCompoundInterest}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Calculate
        </button>

        {/* Results */}
        {result.totalContribution && result.futureValue && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-sm text-center">
            <p className="text-lg font-medium text-gray-700">
              Total Contribution: <span className="font-bold">{result.totalContribution} KES</span>
            </p>
            <p className="text-lg font-medium text-gray-700 mt-2">
              Future Value: <span className="font-bold">{result.futureValue} KES</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;