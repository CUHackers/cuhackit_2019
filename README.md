# Home of CUhackit

## Before you work each day

```bash
$ git pull
```

## Working in branches
Work should be done in a branch off of master. To check current branch:

```bash
$ git branch
```

To switch to another branch:

```bash
$ git checkout <branch_name>
```

### Branch naming
For consistency, use branch names: <your_name>_dev_branch
This will help track changes and with consistency.

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
npm install http-server -g
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

##### Function Header Comments

Each function should have a header of the style:

```c
/*
  A function to check the validity of some detail
  
  Return: boolean, the validity of the given condition
  Param1: integer, the number of letters to find
  Param2: string, a string to test for validity 
*/
function myFunction(letter_num, run_string)
{
  // Do function stuff
  return true;
}
```

While Javascript doesn't have strict variable types, 
it can be useful to other programmers in the project
to know what to expect from your function, both as inputs, and on output.

##### Descriptive Names

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








