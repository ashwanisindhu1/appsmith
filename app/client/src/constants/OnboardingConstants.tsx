import { setCurrentStep } from "actions/onboardingActions";
import { ReduxAction } from "./ReduxActionConstants";

export enum OnboardingStep {
  NONE = -1,
  WELCOME = 0,
  EXAMPLE_DATABASE = 1,
  ADD_WIDGET = 2,
  SUCCESSFUL_BINDING = 3,
  DEPLOY = 4,
}

export type OnboardingTooltip = {
  title: string;
  description: string;
  action?: {
    label: string;
    action?: ReduxAction<OnboardingStep>;
  };
  snippet?: string;
  isFinalStep?: boolean;
};

export type OnboardingStepConfig = {
  setup: () => { type: string; payload?: any }[];
  tooltip: OnboardingTooltip;
};

export const OnboardingConfig: Record<OnboardingStep, OnboardingStepConfig> = {
  [OnboardingStep.NONE]: {
    setup: () => {
      return [];
    },
    tooltip: {
      title: "",
      description: "",
    },
  },
  [OnboardingStep.WELCOME]: {
    setup: () => {
      // To setup the state if any
      // Return action that needs to be dispatched
      return [
        {
          type: "SHOW_WELCOME",
        },
      ];
    },
    tooltip: {
      title: "",
      description: "",
    },
  },
  [OnboardingStep.EXAMPLE_DATABASE]: {
    setup: () => {
      return [
        {
          type: "CREATE_ONBOARDING_DBQUERY_INIT",
        },
        {
          type: "LISTEN_FOR_ADD_WIDGET",
        },
        {
          type: "LISTEN_FOR_TABLE_WIDGET_BINDING",
        },
      ];
    },
    tooltip: {
      title: "Say hello to your example database",
      description:
        "Go ahead, check it out. You can also create a new query or connect to your own db as well.",
      action: {
        label: "Got It!",
      },
    },
  },
  [OnboardingStep.ADD_WIDGET]: {
    setup: () => {
      return [];
    },
    tooltip: {
      title:
        "Wohoo! Your first widget. 🎉 Go ahead and connect this to a Query or API",
      description:
        "Copy the example binding below and paste inside TableData input",
      snippet: "{{ExampleQuery.data}}",
    },
  },
  [OnboardingStep.SUCCESSFUL_BINDING]: {
    setup: () => {
      return [
        {
          type: "LISTEN_FOR_WIDGET_UNSELECTION",
        },
      ];
    },
    tooltip: {
      title: "This table is now connected to Example Query",
      description:
        "You can connect properties to variables on Appsmith with {{ }} bindings",
      action: {
        label: "Next",
        action: setCurrentStep(OnboardingStep.DEPLOY),
      },
    },
  },
  [OnboardingStep.DEPLOY]: {
    setup: () => {
      return [
        {
          type: "LISTEN_FOR_DEPLOY",
        },
      ];
    },
    tooltip: {
      title: "You’re almost done! Just Hit Deploy",
      description:
        "Deploying your apps is a crucial step to building on appsmith.",
      isFinalStep: true,
    },
  },
};
