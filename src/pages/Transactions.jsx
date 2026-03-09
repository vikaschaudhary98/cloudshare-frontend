import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { apiEndpoints } from "../Util/apiEndpoints";
import { AlertCircle, Loader2, Receipt, ShieldCheck } from "lucide-react";

const Transactions=()=>{

  const [transactions,setTransactions]=useState([]);
  const [loading ,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const {getToken}=useAuth();

  useEffect(()=>{
    const fetchTransactions=async()=>{
      try {
        
setLoading(true);
const token=await getToken();
const response=await axios.get(apiEndpoints.TRANSACTIONS,{headers:{
  Authorization:`Bearer ${token}`
}});

setTransactions(response.data);
setError(null);
      } catch (error) {
        console.error("Error fetching transactions",error);
        setError("Failed to load your transaction history . Please try again later.");

      }
      finally{
        setLoading(false);
      }
    }
    fetchTransactions();
  },[getToken]);


const formatDate=(dateString)=>{
  const options={
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"2-digit",
    minute:"2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined,options);
};


const formatAmount=(amountInPaise)=>{
  return `₹${(amountInPaise/100).toFixed(2)}`;
};

const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);

const totalCredits = transactions.reduce(
  (sum, t) => sum + (t.creditsAdded || 0),
  0,
);

const totalPlans = transactions.length;

    return (
      <DashboardLayout activeMenu="Transactions">
        <div className="p-6 min-h-[80vh] flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Receipt className="text-blue-600" />
            <h1 className="text-2xl font-bold">Transaction History</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-bold text-gray-500">Total Spent</p>
              <p className="text-xl font-semibold text-gray-800">
                {formatAmount(totalSpent)}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-bold text-gray-500">Plans Purchased</p>
              <p className="text-xl font-semibold text-gray-800">
                {totalPlans}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <p className="text-bold text-gray-500">Credits Added</p>
              <p className="text-xl font-semibold text-purple-600">
                +{totalCredits}
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-700 rounded-lg flex items-center ">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin mr-2" size={24} />
              <span>Loading Transactions....</span>
            </div>
          ) : transactions.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No Transactions Yet
              </h3>
              <p className="text-gray-500">
                You haven't made any credit purchases yet. Visit the
                Subscription page to buy credits.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Date
                    </th>
                    <th className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Plan
                    </th>
                    <th className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Credits Added
                    </th>
                    <th className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Payment ID
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(transaction.transactionDate)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.planId === "premium"
                          ? "Premium Plan"
                          : transaction.planId === "ultimate"
                            ? "Ultimate Plan"
                            : "Basic Plan"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatAmount(transaction.amount)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.creditsAdded}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.paymentId
                          ? transaction.paymentId.substring(0, 12) + "..."
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-auto pt-6 border-t text-bold text-gray-500 space-y-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-green-500" />
              <p >
                All payments are securely processed through encrypted payment
                gateways. Your payment details are never stored on our servers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-green-500" />
              <p>
                Transactions are verified instantly and credits are added to
                your account immediately after successful payment.
              </p>
            </div>

            
          </div>
        </div>
      </DashboardLayout>
    );
}
export default Transactions;