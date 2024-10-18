# Documentation

## Components

There are different components present in the database that have different functionalities and properties.
Here is an overview:

### <font color="#ff8f1f">document</font>

#### Description

This component is the root element of each chapter.

#### Properties

- title: A string containing the title of the chapter.
- content: A list of Text Components
- tasks: A list of Task Components

### <font color="#ff8f1f">break</font>

#### Description

This component symbolises a simple line-break.

#### Properties

This component has no extra properties

### <font color="#ff8f1f">span</font>

#### Description

This component symbolises a simple text block.

#### Properties

- content: A string representing the text or and array of _span_ and/or _inline-code_ components.

### <font color="#ff8f1f">inline-code</font>

#### Description

This component symbolises a code snippet that should be displayed inline and considerably be highlighted.

#### Properties

- content: A string containing the code to be highlighted.

### <font color="#ff8f1f">link</font>

#### Description

This component symbolises a link that redirects to another URL.

#### Properties

- content: A string containing the text to be displayed.
- url: A string containing the URL to which the link should lead.

### <font color="#ff8f1f">h[n]</font>

#### Description

This component represents a header where the number n is its level.

#### Properties

- content: A String containing the header text.

### <font color="#ff8f1f">ul</font>

#### Description

This component represents an unordered list.

#### Properties

- elements: An array of Text Components.

### <font color="#ff8f1f">img</font>

#### Description

This component represents an image.

#### Properties

- src: A string containing the URL of the image.

### <font color="#ff8f1f">anchor</font>

#### Description

This component represents an anchor tag. They are often used to allow better navigation on the site itself.

#### Properties

- id: The anchor's id.
- content: A _span_ or _h[n]_ component.

### <font color="#ff8f1f">code</font>

#### Description

This component represents a code block. The difference to the _inline-code_ component is that this one can contain multiple
lines and should not be displayed inline!

#### Properties

- content: A string containing the code.

## Special Blocks

### <font color="#ff8f1f">example-block</font>

#### Description

This component is used to make examples.

#### Properties

- title: A string containing the example's title as in what the example is made about.
- content: An array of components. Every component is allowed except Special Blocks.
- output: A string containing the output the example generates.

### <font color="#ff8f1f">import-block</font>

#### Description

This component is used to highlight something important.

#### Properties

- content: An array of components. Every component is allowed except Special Blocks.

### <font color="#ff8f1f">addition-block</font>

#### Description

This component is used to highlight something additional, something that's good to know but no show breaker.

#### Properties

- content: An array of components. Every component is allowed except Special Blocks.

