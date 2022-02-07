interface IDrumSetPicker {
  wrapperClasses?: string;
  onChange(value: string);
  value: string;
}

export default function DrumSetPicker({ wrapperClasses, value, onChange }: IDrumSetPicker) {
  return (
    <div className={wrapperClasses}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Drum kit set:</span>
        </label>
        <select className="select select-bordered w-full" onChange={(e) => onChange(e.target.value)} value={value}>
          <option value="v0">Base</option>
          <option value="v1">Jungle</option>
          <option value="v8">Synthwawe</option>
          <option value="v2">Base alt 1</option>
          <option value="v3">Base alt 2</option>
          <option value="v4">Base alt 3</option>
          <option value="v5">Jungle alt 1</option>
          <option value="v6">Jungle alt 2</option>
          <option value="v7">Jungle alt 3</option>
          <option value="v9">Synthwawe alt 1</option>
        </select>
      </div>
    </div>
  );
}
