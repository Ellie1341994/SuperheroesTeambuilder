import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
export const PowerstatsList: React.FC<{ data: any; className: string }> = ({
  data,
  className,
}) => {
  let areValuesNumber: boolean = false;
  /** @summary Descending order */
  let orderedPowerstatsData: Array<[string, any]> = Object.entries(
    data.powerstats
  ).sort(
    (
      [_firstKey, firstValue]: [string, any],
      [_secondKey, secondValue]: [string, any]
    ) => {
      areValuesNumber = /\d+/.test(firstValue + secondValue);
      if (areValuesNumber) {
        return secondValue - firstValue;
      }
      return 0;
    }
  );
  const powerstats: JSX.Element[] = [];
  const weightOrHeightBox: JSX.Element[] = [];
  for (let [key, value] of orderedPowerstatsData) {
    if (value === "null") {
      value = undefined;
    }
    let isPowerstat = !/weight|height/.test(key);
    if (!isPowerstat) {
      key = key + " average";
      value = /weight/.test(key) ? value + " kg" : value + " cm";
    }
    (!isPowerstat ? weightOrHeightBox : powerstats).push(
      <ListGroup.Item
        className="bg-transparent d-flex justify-content-between flex-wrap text-capitalize p-0"
        key={key + data.name}
      >
        <strong style={{ textOverflow: "elipsis" }} children={key + ":"} />
        {value || "..."}
      </ListGroup.Item>
    );
  }
  return (
    <Container
      className="p-0 m-0 h-100"
      fluid
      children={
        <ListGroup className={className} variant="flush">
          {powerstats}
          {weightOrHeightBox}
        </ListGroup>
      }
    />
  );
};
