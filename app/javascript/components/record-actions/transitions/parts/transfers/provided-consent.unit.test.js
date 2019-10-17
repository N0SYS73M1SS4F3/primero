import React from "react";
import "test/test.setup";
import { expect } from "chai";
import { setupMountedComponent } from "test";
import { Field, Form, Formik } from "formik";
import { Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import ProvidedConsent from "./provided-consent";

const ProvidedConsentForm = props => {
  const formProps = {
    initialValues: {
      referral: false
    }
  };
  return (
    <Formik {...formProps}>
      <Form>
        <ProvidedConsent {...props} />
      </Form>
    </Formik>
  );
};

describe("<ProvidedConsent />", () => {
  let component;
  describe("when user can override consent", () => {
    const props = {
      canConsentOverride: true,
      providedConsent: false,
      setDisabled: () => { }
    };

    describe("with not provided consent given", () => {
      beforeEach(() => {
        ({ component } = setupMountedComponent(ProvidedConsentForm, props));
      });

      it("renders Grid", () => {
        expect(component.find(Grid)).to.have.length(3);
      });

      it("renders FormControlLabel", () => {
        expect(component.find(FormControlLabel)).to.have.length(1);
      });

      it("renders Checkbox", () => {
        expect(component.find(Checkbox)).to.have.length(1);
      });

      it("renders Field", () => {
        expect(component.find(Field)).to.have.length(1);
      });
    });

    describe("with provided consent given", () => {
      const providedConsent = true;
      beforeEach(() => {
        ({ component } = setupMountedComponent(ProvidedConsentForm, {
          ...props,
          providedConsent
        }));
      });

      it("should not render anything", () => {
        expect(component).to.be.empty;
      });
    });
  });

  describe("when user can not override consent", () => {
    const props = {
      canConsentOverride: false,
      providedConsent: false,
      setDisabled: () => { }
    };
    beforeEach(() => {
      ({ component } = setupMountedComponent(ProvidedConsentForm, props));
    });
    it("should not render anything", () => {
      expect(component).to.be.empty;
    });
  });
});