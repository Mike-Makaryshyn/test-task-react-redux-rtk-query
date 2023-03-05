import "./front-section.scss";

const FrontSection = ({onSingUpClick}) => {
  return (
    <section className="front-section">
      <div className="front-section__content">
        <h1 className="front-section-title">
          Test assignment for front-end developer
        </h1>
        <p className="front-section-text">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button type="button" onClick={onSingUpClick} className="regular-btn sing-up-btn">Sing up</button>
      </div>
    </section>
  );
};

export default FrontSection;
