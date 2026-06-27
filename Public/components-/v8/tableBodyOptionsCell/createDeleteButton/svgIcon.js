const svgIcon = ({ withMargin = true } = {}) => {
    const marginClass = withMargin ? " mr-1" : "";
    return `
<svg xmlns="http://www.w3.org/2000/svg"
     fill="none"
     viewBox="0 0 24 24"
     stroke-width="1.5"
     stroke="currentColor"
     class="inline w-4 h-4${marginClass}">
  <path stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 7.5h12m-9 0V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 6v1.5m-7.5 0v10.125A2.625 2.625 0 0010.125 20.25h3.75A2.625 2.625 0 0016.5 17.625V7.5M9.75 10.5v6m4.5-6v6" />
</svg>
`;
};

export default svgIcon;
