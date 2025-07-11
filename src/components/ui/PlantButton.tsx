import '../../styles/plant-button.css';

export default function PlantButton() {
  return (
    <button className="plant-button">
      Plant based
      <div className="icon-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          style={{
            shapeRendering: 'geometricPrecision',
            textRendering: 'geometricPrecision',
             fillRule: 'evenodd',
            clipRule: 'evenodd',
          }}
          viewBox="0 0 208.52 511.88"
        >
          <g id="Layer_x0020_1">
            <path
              className="fil-leaf-1"
              d="M121.86 141.25c16.73,2.91 65.77,9.16 77.74,-14.94..."
            />
          </g>
        </svg>
      </div>
      <div className="icon-2">
        {/* Repeat similar svg with correct className and style object */}
      </div>
      <div className="icon-3">
        {/* SVG 3 */}
      </div>
      <div className="icon-4">
        {/* SVG 4 */}
      </div>
      <div className="icon-5">
        {/* SVG 5 */}
      </div>
    </button>
  );
}
