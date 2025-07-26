import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Searchbar() {
  const [userQuery, setUserQuery] = useState<string>("");

  //========= Router from next/navigation =========//
  const router = useRouter();

  //========= Search Function =========//
  const handleSearch = () => {
    const query = userQuery.trim().toLowerCase();

    if (!query) return;

    setUserQuery("");
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        placeholder="Search games..."
        inputMode="text"
        className="hidden sm:flex w-full lg:min-w-[350px] border border-border px-2 py-1 rounded-lg outline-0 focus:ring-2 focus:ring-primary transition duration-300"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
    </form>
  );
}
