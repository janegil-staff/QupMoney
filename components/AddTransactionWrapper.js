"use client";
import AddTransactionModal from "./AddTransactionModal";

export default function AddTransactionWrapper() {
  return <AddTransactionModal onCreate={() => location.reload()} />;
}
