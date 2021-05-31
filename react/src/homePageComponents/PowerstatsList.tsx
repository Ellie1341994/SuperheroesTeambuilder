import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
export const PowerstatsList: any = ({ data }: any) => {
  let areValuesNumber: boolean = false;
  /** @summary Order is descending */
  let orderedPowerstatsData: any = Object.entries(data.powerstats).sort(
    ([_firstKey, firstValue]: any, [_secondKey, secondValue]: any) => {
      areValuesNumber = /\d+/.test(firstValue + secondValue);
      if (areValuesNumber) {
        return secondValue - firstValue;
      }
      return 0;
    }
  );
  const powerstats: any = [];
  const weightOrHeightBox: any = [];
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
        className="bg-transparent d-flex justify-content-between text-capitalize p-0"
        key={key + data.name}
      >
        <strong style={{ textOverflow: "elipsis" }} children={key + ":"} />
        {value || "..."}
      </ListGroup.Item>
    );
  }
  return (
    <Container
      className="overflow-scroll p-0 m-0"
      fluid
      children={
        <ListGroup className="bg-transparent pr-3 pl-3" variant="flush">
          {powerstats}
          {weightOrHeightBox}
        </ListGroup>
      }
    />
  );
};
