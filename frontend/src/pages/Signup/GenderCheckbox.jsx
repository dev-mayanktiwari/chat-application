const GenderCheckbox = () => {
  return (
    <div className="flex gap-4">
      <label className="label gap-2 cursor-pointer">
        <input type="radio" name="gender" className="radio-sm" defaultChecked />
        <span className="label-text">Male</span>
      </label>
      <label className="label gap-2 cursor-pointer">
        <input type="radio" name="gender" className="radio-sm" />
        <span className="label-text">Female</span>
      </label>
    </div>
  );
};

export default GenderCheckbox;
