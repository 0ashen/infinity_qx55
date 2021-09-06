import Select from 'react-select';
import React, { VFC } from 'react';
import { InfinitiSelectWrapper } from './InfinitiSelect.styled';
import { InfinitiSelectProps } from './InfinitiSelect.type';

export const InfinitiSelect: VFC<InfinitiSelectProps> = ({
    caption,
    error,
    touched,
    options,
    value,
    onChange,
    onBlur,
    name,
    placeholder,
    defaultValue,
    resetName,
}) => {
    return (
        <InfinitiSelectWrapper>
            <div className="caption">{caption}</div>
            <Select
                className="select"
                classNamePrefix="select"
                defaultValue={defaultValue}
                value={value}
                isClearable={false}
                isSearchable={true}

                onChange={(value) => {
                    if (resetName) {
                        //@ts-ignore
                        if (value.dealersList.length === 1) {
                            //@ts-ignore
                            onChange(resetName, value.dealersList[0]);
                        } else {
                            onChange(resetName, null);
                        }
                    }
                    onChange(name, value);
                }}
                onBlur={() => {
                    onBlur(name, true);
                }}
                name={name}
                options={options}
                placeholder={placeholder}
                noOptionsMessage={base => "Нет данных"}
            />
            <div className="error">
                {!!error &&
                    touched &&
                    (Array.isArray(error) ? error : [error]).map((el, idx) => (
                        <p
                            style={{ color: 'red', marginTop: '.5rem' }}
                            key={idx}
                        >
                            {typeof el === 'object' ? el.value : el}
                        </p>
                    ))}
            </div>
        </InfinitiSelectWrapper>
    );
};
