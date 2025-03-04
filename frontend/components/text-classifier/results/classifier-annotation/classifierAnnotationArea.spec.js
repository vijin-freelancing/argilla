import { shallowMount } from "@vue/test-utils";
import ClassifierAnnotationArea from "./ClassifierAnnotationArea";
import ClassifierAnnotationButton from "./ClassifierAnnotationButton";
import { TextClassificationRecord } from "@/models/TextClassification";

let wrapper = null;
const options = {
  propsData: {
    record: new TextClassificationRecord({
      inputs: { text: "My text", multi_label: false },
    }),
    dataset: {
      task: "TextClassification",
      isMultiLabel: true,
      viewSettings: {
        annotationEnabled: false,
      },
      labels: ["label1"], // WARNING, if labels is empty then the ClassifierAnnotationButton will no be render => test 2/3/4/5 will failed
    },
  },
};
const spyUpdateLabelsMethod = jest.spyOn(
  ClassifierAnnotationArea.methods,
  "updateLabels"
);
beforeEach(() => {
  wrapper = shallowMount(ClassifierAnnotationArea, options);
});

afterEach(() => {
  wrapper.destroy();
});

describe("ClassifierAnnotationAreaComponent", () => {
  it("render the component", () => {
    expect(wrapper.is(ClassifierAnnotationArea)).toBe(true);
  });
  it("render the child component if props labels is not empty", () => {
    const annotationButtons = wrapper.findComponent(ClassifierAnnotationButton);
    expect(annotationButtons.exists()).toBe(true);
  });
  it("emit the 2 annotations selected by the user to the parent component", async () => {
    testIfEmittedValuesFromValidateEventIsEqualToUserSelectedAnnotations([
      "label1",
    ]);
  });
  it("emit the 2 annotations selected by the user to the parent component", async () => {
    testIfEmittedValuesFromValidateEventIsEqualToUserSelectedAnnotations([
      "label1",
      "label2",
    ]);
  });
  it("emit an empty list to the parent if the user have selected any annotations", async () => {
    testIfEmittedValuesFromValidateEventIsEqualToUserSelectedAnnotations([]);
  });
});

const testIfEmittedValuesFromValidateEventIsEqualToUserSelectedAnnotations =
  async (selectedAnnotations) => {
    const annotationButtons = wrapper.findComponent(ClassifierAnnotationButton);
    const emittedValuesFromAnnotationButtons = selectedAnnotations;
    annotationButtons.vm.$emit("change", emittedValuesFromAnnotationButtons);
    await wrapper.vm.$nextTick();
    expect(spyUpdateLabelsMethod).toHaveBeenCalled();
    if (selectedAnnotations.length) {
      selectedAnnotations.forEach((annotation) => {
        expect(wrapper.vm.selectedLabels).toContain(annotation);
      });
    }
    expect(wrapper.vm.selectedLabels.length).toBe(
      emittedValuesFromAnnotationButtons.length
    );
    expect(wrapper.emitted("validate"));
    expect(wrapper.emitted().validate[0]).toEqual([
      { labels: emittedValuesFromAnnotationButtons },
    ]);
  };
