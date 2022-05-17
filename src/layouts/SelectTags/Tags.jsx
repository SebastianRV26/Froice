import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import data from "./data.json";

const Tags = ({ onCandSend, onSetNames, groupsOf }) => {
  const [currentChecks, setCurrentChecks] = useState(0);

  //const dataTags = makeSubGroups(data.tags);

  const arrayRemove = (arr, value) => {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  };

  const handleCheckboxChange = (changeEvent) => {
    const { name, checked } = changeEvent.target;
    if (checked) {
      setCurrentChecks(currentChecks + 1);
      onSetNames((prev) => [...prev, name]);
    } else {
      setCurrentChecks(currentChecks - 1);
      onSetNames((prev) => arrayRemove(prev, name));
    }
  };

  const makeSubGroups = (list, len) => {
    const newList = [];
    let newSubList = [];
    let i = 0;
    for (i = 0; i < list.length; i++) {
      newSubList.push(list[i]);
      if (Math.ceil((i + 1) % len === 0)) {
        newList.push(newSubList);
        newSubList = [];
      }
    }
    if (Math.ceil((i + 1) % len !== 0) && newSubList.length !== 0) {
      newList.push(newSubList);
    }
    return newList;
  };

  const dataTags = makeSubGroups(data.tags, 5);
  useEffect(() => {
    onCandSend(currentChecks >= groupsOf);
  }, [currentChecks]);

  return (
    <>
      {Array.from({ length: dataTags.length }).map((_, idx1) => (
        <div key={`div-inline-checkbox-${idx1}`} className="mb-3">
          {dataTags[idx1].map((el, idx2) => (
            <Form.Check
              inline
              label={el}
              name={el}
              type="checkbox"
              onChange={handleCheckboxChange}
              id={`inline-checkbox-${(idx1 + 1) * (idx2 + 1000)}`}
              key={`inline-checkbox-${(idx1 + 1) * (idx2 + 1000)}`}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Tags;
