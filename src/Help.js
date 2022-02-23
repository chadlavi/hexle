import ClickAwayListener from "react-click-away-listener";
import { CloseIcon } from "./Icons";
import { Guess } from "./Guess";

export function Help({ toggle }) {
  return (
    <div id="help">
      <ClickAwayListener onClickAway={toggle}>
        <div id="help-modal">
          <div id="help-modal-button">
            <button title="close help" onClick={toggle} className="icon-button">
              <CloseIcon />
            </button>
          </div>
          <div id="help-modal-content">
            <h1>What the hexle?</h1>
            <div id="help-modal-scroll">
              <p>
                Hexle challenges you to guess a randomly generated CSS{" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.w3schools.com/Css/css_colors_rgb.asp"
                >
                  RGB color code
                </a>
                .
              </p>
              <h2>Gameplay</h2>
              <p>
                The R (red), G (green), and B (blue) values of the hex code are
                entered separately. Only valid hex color values (i.e., hexadecimal
                numbers between 00 and ff) are accepted.
              </p>
              <p>You can guess as many times as you want.</p>
              <p>Here's an example guess: </p>
              <Guess
                active={false}
                correctColor={{
                  color: "#b9aae2",
                  hex0: "b9",
                  hex1: "aa",
                  hex2: "e2"
                }}
                hex0={{ value: "b9" }}
                hex1={{ value: "ac" }}
                hex2={{ value: "33" }}
              />
              <h3>Correct values in guesses</h3>
              <p>
                The R value in our example guess is correct! Correctly guessed
                color values are shown in <span className="green">green</span>.
              </p>
              <h3>Close values in guesses</h3>
              <p>
                The G value in our example guess is close, but not quite correct.
                Close guesses are shown in <span className="yellow">yellow</span>.
              </p>
              <p>
                The G value in our example guess contains another hint: the bar at
                the bottom of the G value means that the correct value is{" "}
                <span class="yellow over">lower</span> than the guessed value.
                This will happen any time the correct value is lower than what you
                guessed, not just if you're close.
              </p>
              <h3>Other values in guesses</h3>
              <p>
                The B value in our example guess is not correct, and it's also not
                close. Guesses that are not close are shown in{" "}
                <span className="grey">grey</span>.
              </p>
              <p>
                The B value in our example has a bar at the top, indicating that
                the correct value is <span className="grey under">higher</span>{" "}
                than the guessed value. This will happen any time the correct
                value is higher than what you guessed, including if your guess was
                close.
              </p>
              <h3>Comparing your guess to the correct color</h3>
              <p>
                At the right of the guess, the color you guessed (left) and the
                correct color (right) are shown side by side for easy comparison
                in making your next guess.
              </p>
              <h2>How many times can I play per day?</h2>
              <p>
                I dunno, like a million I guess? The random color is generated
                when you load the page, and it's different for everyone (unless it
                happens to be the same; there are only 16,581,375 unique hex
                colors). You can just reload the page to play again.
              </p>
              <h2>Couldn't I just cheat with dev tools?</h2>
              <p>
                Yeah, sure. Go nuts. I'm not going to stop you. But what's the fun
                in that?
              </p>
              <h2>Attribution</h2>
              <p>This game is sorta kinda like wordle.</p>
              <p>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="http://chadlavimoniere.com"
                >
                  Chad Lavimoniere
                </a> build this based on an idea by <a target="_blank" rel="noreferrer" href="http://gregtaff.com">
                  Greg Archer
                </a>. You can see the code for this app on <a target="_blank" rel="noreferrer" href="https://github.com/chadlavi/hexle">
                  github
                </a>.
              </p>
            </div>
            <div id="help-modal-buttons-row">
              <button onClick={toggle}>Got it, let's HEXLE!</button>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </div>
  );
}
