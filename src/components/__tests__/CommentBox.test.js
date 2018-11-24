import React from "react";
import { mount } from "enzyme";
import CommentBox from "components/CommentBox";

// going to use fullDom ('mount') instead of shallow for practice
// otherwise should have used shallow
// when using mount, have to do some clean up so other tests wont impact each other

let wrapped;

beforeEach(() => {
  wrapped = mount(<CommentBox />);
});

afterEach(() => {
  // unmout component from that JSDom structure
  wrapped.unmount();
});

it("has a text area and a button", () => {
  expect(wrapped.find("textarea").length).toEqual(1);
  expect(wrapped.find("button").length).toEqual(1);
});

describe("the text area", () => {
  beforeEach(() => {
    // simulate a change event on the textarea,
    // give it a fake event object, 'mock object',

    wrapped.find("textarea").simulate("change", {
      target: { value: "new comment" }
    });

    // since setState is async, have to force component to rerender
    wrapped.update();
  });

  it("has a text area that users can type in", () => {
    // assert the value of textarea has changed
    expect(wrapped.find("textarea").prop("value")).toEqual("new comment");
  });

  it("empties the value of the textarea when user submits the form", () => {
    wrapped.find("form").simulate("submit");
    wrapped.update();
    expect(wrapped.find("textarea").prop("value")).toEqual("");
  });
});
