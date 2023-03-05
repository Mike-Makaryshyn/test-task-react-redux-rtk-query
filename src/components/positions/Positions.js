import { CSSTransition, TransitionGroup } from "react-transition-group";

const Positions = ({ isPosSucces, onPositionChange, positions }) => {
   
  const renderPositions = (arr) => {
    if (isPosSucces) {
      return arr.map(({ id, name }) => {
        return (
          <CSSTransition key={id} timeout={500} classNames="user">
            <div>
               <label className="radio-label" htmlFor={name}>
                     <input
                        required
                        type="radio"
                        id={name}
                        className="positions-radio"
                        custom={id}
                        name="positions"
                        value={name}
                        onChange={onPositionChange}
                     />
                     {name}
                  </label>
            </div>
          </CSSTransition>
        );
      });
    }
  };

  const positionElements = renderPositions(positions);

  return (
    <>
      <legend style={{marginBottom: '10px'}}>Select your position</legend>
      <TransitionGroup>
         {positionElements}
      </TransitionGroup>
    </>
  );
};

export default Positions;
