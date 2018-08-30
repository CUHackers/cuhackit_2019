# CU Hackathon Splash-Page

## Installation

You only need to build the css, then push to gh-pages!

```bash
$ npm install
$ npm build

```

## Testing changes on the site

In order to test changes to the website, a test server such as http-server should be used.
Running the following command in the directory where the index.html is will start a localhost
server which can be used to show the current state of the website.

```bash
http-server -p 8000
```

If http-server is not installed, it should be able to download it using:

```bash
npm install http-server
```

Test often to verify your changes as you go. Avoid pushing broken code.

## CURRENT PRIMARY GOALS

  We need to aim to provide a better README so that it is possible for any
future team members to inherit the website and be immediately at home or to
have the tools to find necessary information.
  Additionally, READMEs do not have to be a one-time deal. If you write for 
a new section of the website, write a README for that section. This can help
keep this README streamlined while making relevant information for a particular
part of the website more easily accessible. 

### TO THIS END
#### Descriptive Comments
  All code must be meticulously and descriptively commented. We've all heard
it from our teachers, but we must strive to exemplify good commenting practices.
Comments should not be:

```c
int foo = 4; // Set variable foo to four
```
   However, a brief message of the usage for the variable would be a good use of 
text:

```c
//  number of loops for bar_loop
int bar = 4; 
```

#### Comment As You Go
 
  Commenting is both a lost art and a process. Comment as you code or it will
become backed up and will never be completed.

#### Descriptive Names

  Names should be enough to approximate the use of a variable. It is not a
replacement for comments, but should allow the comments to add more clarity
to the variable's use. 

To continue from:

```c 
//  number of loops for bar_loop
int bar = 4;
```

If bar controls a loop, a better name may be:

```c
// Controls loops to set display of foo
int num_bar_loops = 4;
```








