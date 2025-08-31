import { CustomSelect } from '@vkontakte/vkui';
import { useSelector } from 'react-redux';

const SelectList = ({ setTemplate, template }) => {
    const templates = useSelector(state => state?.main?.templates) || [];

    const options = templates.map(t => ({
        label: t.name,
        value: t.id,
    }));

    return (
        <CustomSelect
        placeholder="Выберите значение"
        options={options}
        onChange={(e) => setTemplate(e.target.value)}
        value={template}
        />
    );
};

export default SelectList;
