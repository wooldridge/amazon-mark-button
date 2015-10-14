<img alt="Amazon Mark Button" src="https://raw.githubusercontent.com/wooldridge/amazon-mark-button/master/images/amazon-mark-button_sm.png" />

Turn your Amazon Dash Button into an Amazon Mark Button! This Node.js script  performs a MarkLogic database operation when an
Amazon Dash Button is pressed.

## References

* [node-dash-button](https://www.npmjs.com/package/node-dash-button)
* [How I Hacked Amazon’s $5 WiFi Button to track Baby Data](https://medium.com/@edwardbenson/how-i-hacked-amazon-s-5-wifi-button-to-track-baby-data-794214b0bdd8)
* [Amazon Dash Button Teardown](https://mpetroff.net/2015/05/amazon-dash-button-teardown/)
* [Dash Hacking](https://learn.adafruit.com/dash-hacking-bare-metal-stm32-programming/overview)
* [Amazon_Dash_Button](https://github.com/dekuNukem/Amazon_Dash_Button)

## Prerequisites

* [Node.js and npm](http://nodejs.org)
* libpcap

## Setup

1. Purchase an Amazon Dash Button:

   [Shop Dash Buttons](http://www.amazon.com/gp/browse.html?node=10667898011)

2. Install the libpcap dependency. On Mac OS X, this worked for me:

   [How to install Python libpcap module on Mac OS X](http://stackoverflow.com/questions/27149377/how-to-install-python-libpcap-module-on-mac-os-x)

3. Install amazon-mark-button:

   ```
   $ git clone https://github.com/wooldridge/amazon-mark-button
   ```

4. Install the npm dependencies for amazon-mark-button:

   ```
   $ cd amazon-mark-button
   $ npm install
   ```

6. Set up the Amazon Dash Button on your WiFi network. Important: Do not
complete the entire setup process described by Amazon. You do not want the
button actually ordering Amazon products. Stop when the instructions ask you
to choose a product to order with the button:

   [Set Up Your Dash Button](https://www.amazon.com/gp/help/customer/display.html?nodeId=201746340)

7. Now that the Dash Button is on your WiFi network, get its MAC address using
a script from the node-dash-button module:

   ```
   $ cd node_modules/node-dash-button
   $ node bin/findbutton
   ```
   Press your dash button and look for the corresponding MAC address in the
   console. MAC addresses look like this:

   ```
   74:c2:46:ad:f5:b7
   ```

9. Open the config_sample.js file and add the MAC address. Also specify your
MarkLogic settings (username, password, database, operation, etc.). The
following operations are supported:

   * clear
   * backup
   * merge
   * reindex

   Save the updated config_sample.js file as config.js.

10. Run the button.js script:

   ```
   $ cd ../..
   $ node button.js
   ```

   When you press the Amazon Dash Button, the database operation is performed.
