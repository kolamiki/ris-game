// src/components/UpgradeMenu.tsx
import React from "react";

type Upgrade = {
  name: string;
  description: string;
};

type Props = {
  upgrades: Upgrade[];
  onSelect: (upgrade: Upgrade) => void;
};

const UpgradeMenu: React.FC<Props> = ({ upgrades, onSelect }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl mb-4">Choose an Upgrade</h2>
      <div className="flex flex-col gap-2">
        {upgrades.map((u) => (
          <button
            key={u.name}
            className="px-4 py-2 bg-indigo-600 rounded"
            onClick={() => onSelect(u)}
          >
            <strong>{u.name}</strong>: {u.description}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UpgradeMenu;
