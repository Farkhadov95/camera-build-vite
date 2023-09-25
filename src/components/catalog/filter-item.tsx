type Props = {
  name: string;
  title: string;
  onChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterItem = ({ name, title, onChecked, onChange }: Props) => (
  <div className="custom-checkbox catalog-filter__item">
    <label>
      <input
        type="checkbox"
        name={name}
        checked={onChecked}
        onChange={onChange}
      />
      <span className="custom-checkbox__icon"></span>
      <span className="custom-checkbox__label">{title}</span>
    </label>
  </div>
);

export default FilterItem;
