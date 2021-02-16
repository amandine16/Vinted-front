import { Range, getTrackBackground } from "react-range";
import { useState } from "react";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const FilterBar = ({ rtl, filters, setFilters }) => {
  const [values, setValues] = useState([1, 500]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        marginLeft: "12px",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => {
          // Quand je bouge mon curseur, mes valeurs se mettent à jour dans mon state filters
          setValues(values);
          const newfilters = { ...filters };
          newfilters.priceMin = values[0];
          newfilters.priceMax = values[1];
          setFilters(newfilters);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "316px",
            }}
          >
            <div
              className="barBetweenPrice"
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "#2CB1BA", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              backgroundColor: "#2CB1BA",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #fff",
              border: ".5px solid #fff",
              borderRadius: "50%",
              outline: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "rgb(255, 255, 255)",
                fontSize: "12px",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "rgb(44, 177, 186)",
              }}
            >
              {values[index]}€
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default FilterBar;
