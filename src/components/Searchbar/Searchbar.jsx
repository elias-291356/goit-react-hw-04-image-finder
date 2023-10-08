import React, { useState } from 'react';
import style from '../../Style.module.css'

export const Searchbar = ({ handleSubmit }) => {


  const [inputValue, setInputValue] = useState('');

  const onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    handleSubmit(inputValue)
  }



  return (
    <div>
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={onSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}
            >Search</span>
          </button>
          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onInputChange}
            value={setInputValue}
            name='inputValue'
          />
        </form>

      </header>
    </div>
  );
}



