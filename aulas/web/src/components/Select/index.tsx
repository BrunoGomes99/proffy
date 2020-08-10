import React, { SelectHTMLAttributes } from 'react';  // VER O COMPONENTE DE INPUT PARA EXPLICAÇÕES

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{ // O array deve ter um tipo. No caso, o tipo passado é um objeto js (Por isso as chaves). E esse objeto contém um value (formato string) e um label (formato string)
        value: string;
        label: string;
    }>;
}

// O option de selecione uma opção, contém o value vazio (string vaia) pq ele não é pra ser selecionado. O disabled é pra que ele venha desabilitado por padrão e "hidden" pra que ele n apareça nas options do select
// O value vazio dentro do select é pra que a opção que contém o valor (""), no caso a "selecione uma opção", seja a opção selecionada por padrão ao carregar a página
const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option value="" disabled hidden>Selecione uma opção</option>

                {options.map(option => { // Vai percorrer todo o options (por isso o map) e pra cada um vai retornar tag options
                    return <option key={option.value} value={option.value}>{option.label}</option> // O atributo key deve ser passado sempre no primeiro elemento de um map
                })}
            </select>
        </div>
    );  
}


export default Select;