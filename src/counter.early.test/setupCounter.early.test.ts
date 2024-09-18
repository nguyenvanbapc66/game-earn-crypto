// Unit tests for: setupCounter

import { setupCounter } from "../counter";

describe("setupCounter() setupCounter method", () => {
  let buttonElement: HTMLButtonElement;

  beforeEach(() => {
    // Create a new button element before each test
    buttonElement = document.createElement("button");
  });

  // Happy Path Tests
  describe("Happy Path", () => {
    it("should initialize the counter to 0 and display it on the button", () => {
      // Arrange & Act
      setupCounter(buttonElement);

      // Assert
      expect(buttonElement.innerHTML).toBe("count is 0");
    });

    it("should increment the counter by 1 when the button is clicked", () => {
      // Arrange
      setupCounter(buttonElement);

      // Act
      buttonElement.click();

      // Assert
      expect(buttonElement.innerHTML).toBe("count is 1");
    });

    it("should increment the counter correctly after multiple clicks", () => {
      // Arrange
      setupCounter(buttonElement);

      // Act
      buttonElement.click();
      buttonElement.click();
      buttonElement.click();

      // Assert
      expect(buttonElement.innerHTML).toBe("count is 3");
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle rapid consecutive clicks correctly", () => {
      // Arrange
      setupCounter(buttonElement);

      // Act
      for (let i = 0; i < 100; i++) {
        buttonElement.click();
      }

      // Assert
      expect(buttonElement.innerHTML).toBe("count is 100");
    });

    it("should not throw an error if the button is clicked before setupCounter is called", () => {
      // Arrange & Act
      expect(() => {
        buttonElement.click();
      }).not.toThrow();

      // Now setupCounter and click
      setupCounter(buttonElement);
      buttonElement.click();

      // Assert
      expect(buttonElement.innerHTML).toBe("count is 1");
    });

    it("should correctly update the counter if setCounter is called directly with a specific value", () => {
      // Arrange
      setupCounter(buttonElement);

      // Act
      const setCounter = (count: number) => {
        buttonElement.innerHTML = `count is ${count}`;
      };
      setCounter(42);

      // Assert
      expect(buttonElement.innerHTML).toBe("count is 42");
    });
  });
});

// End of unit tests for: setupCounter
