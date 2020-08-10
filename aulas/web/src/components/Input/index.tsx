import React, { InputHTMLAttributes } from 'react';  // InputHTMLAttributes é para colocar os diferentes atributos no input

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { // HTMLInputElement não foi preciso importar, é uma variável global
    name: string;
    label: string;
}

// Dentro dos parênteses poderia ser só "props", igual tem no component do PageHeader. Essa é só outra forma de fazer
const Input: React.FC<InputProps> = ({ label, name, ...rest }) => { // Tá dizendo que passa a label, o name e todo o resto (se referindo ao que é herdado do InputHRMLAttributes)
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>
    );  
}

// Repara que lá no index.tsx do TeacherList, o Input das horas passa o parâmetro time. Esse parâmetro é próprio do html e já está pronto pra ser recebido devido ao {...rest} que passamos ali em cima no input

export default Input;