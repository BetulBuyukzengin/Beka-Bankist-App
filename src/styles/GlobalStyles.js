import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Kanit:400");
:root{
     &, &.light-mode {
        --color-text: #080808;
        --color-text-2: rgba(8, 8, 8, 0.2);
        --color-background: rgba(245, 245, 245, 0.8);
        --color-background-2: rgba(245, 245, 245, 1);
        --color-background-3:rgba(152,146,146,0.1);
        --color-background-4:rgba(245, 245, 245, 1);

        //yeni ekledıgım
        --color-background-5:rgba(255, 255, 255, 0.55)



        --color-primary: #011d98;
        --color-secondary: #5067CE;
        --color-accent: #00466A;
        --color-border: rgba(0, 0, 0, 0.03);
        --color-border-2: rgba(0, 0, 0, 0.1);
        --color-gray: #6c757d;
        --color-success: #2e7d32;
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
        --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
        --backdrop-color: rgba(255, 255, 255, 0.1);
        --image-grayscale: 0;
        --image-opacity: 100%;
            }

    &.dark-mode {
        --color-text: #f7f7f7;
        --color-text-2: rgba(247, 247, 247, 0.2);
        --color-background: rgba(10, 10, 10, 0.8);
        --color-background-1: #0F1214;

        
        /* --color-background: rgba(10, 10, 10, 0.64);  bunu yap*/

      
        --color-background-2: rgba(10, 10, 10, 1);
        --color-background-3:rgba(239,239,239,0.1);
        --color-background-4:rgba(152,146,146,0.1);


        --color-background-5:rgba(255, 255, 255, 0.15)


        --color-primary: #98aafb;
        --color-secondary: #6783fe;
        --color-accent: #c3eafe;
        --color-border: rgba(255, 255, 255, 0.03);
        --color-border-2: rgba(255, 255, 255, 0.33);
        --color-gray: #a0a0a0;
        --color-success: #2e7d32;
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
        --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
        --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
        --backdrop-color: rgba(0, 0, 0, 0.3);
        --image-grayscale: 10%;
        --image-opacity: 90%;
    }

    --font-texts: "Roboto","Helvetica","Arial",sans-serif;
    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;

    /* GRADIENTS */ 
    --linearPrimarySecondary: linear-gradient(#475ad4, #6e7eec);
    --linearPrimaryAccent: linear-gradient(#475ad4, #808fef);
    --linearSecondaryAccent: linear-gradient(#6e7eec, #808fef);
    --radialPrimarySecondary: radial-gradient(#475ad4, #6e7eec);
    --radialPrimaryAccent: radial-gradient(#475ad4, #808fef);
    --radialSecondaryAccent: radial-gradient(#6e7eec, #808fef);
    --color-error:#d32f2f;
    /* Belki kullanırız */
    /*
    --color-brand-50: #eef2ff;
    --color-brand-100: #e0e7ff;
    --color-brand-200: #c7d2fe;
    --color-brand-500: #6366f1;
    --color-brand-600: #4f46e5;
    --color-brand-700: #4338ca;
    --color-brand-800: #3730a3;
    --color-brand-900: #312e81; 
    */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  /* Creating animations for dark mode */
  transition: all 50ms;
  scroll-behavior: smooth;
}

body {
    font-family: 'Kanit', sans-serif;
    font-weight: 400;
    font-size: 62.5%;
    padding-right: 0!important;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

ul {
    list-style: none;
}

a {
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    /* font-family: 'Poppins'; */
    font-weight: 600;
    overflow-wrap: break-word;
    hyphens: auto;

}

svg{
  transition: none;
}
.MuiSvgIcon-root{
  color: var(--color-text)!important;
}
.MuiSwitch-track{
  background-color: var(--color-text)!important;
}

.MuiButtonBase-root:hover{
background-color:var( --color-text-2);
}

.carousel-inner > div >div{
display: block!important;
}
img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/* Toastify responsive */
@media (max-width: 48em) {
  .Toastify__toast {
    font-size: .8rem; /* Yazı boyutunu küçült */
  }
}
@media (max-width: 31.25em) {
  .Toastify__toast {
    margin: .5rem;
    width: 90%; /* Mobilde ekranın %90'ı kadar genişlik */
    height:20px;
    font-size: .7rem; /* Yazı boyutunu küçült */
  }
}
`;
export default GlobalStyles;
