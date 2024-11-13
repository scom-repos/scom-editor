# Scom Editor Widget

## Overview

The Scom Editor Widget is a powerful and customizable editor component designed to provide a rich text editing experience. It supports various features such as custom widgets, block management, and theme customization.

## Features

- **Custom Widgets**: Easily add and manage custom widgets within the editor.
- **Block Management**: Insert, update, and manage different types of content blocks.
- **Theme Customization**: Customize the editor's appearance with light and dark themes.
- **Toolbar and Menus**: Utilize toolbars and menus for formatting and inserting content.

## Installation

### Step 1: Install Packages

To install the necessary packages, run the following command:

```sh
docker-compose up install

## Step 1: Install packages
```sh
docker-compose up install
```
## Step 2: Build and bundle library
```sh
docker-compose up build
```

## Step 3: Run test
```sh
docker-compose up -d test
```
Access the dev server via http://127.0.0.1:8025/

## Usage
To use the Scom Editor Widget in your project, import it and include it in your component as follows:

render() {
    return (
        <i-panel>           
            <i-scom-editor
                id="postEditor"
                font={{ size: '1.25rem', color: Theme.text.primary }}
                cursor="text"
            ></i-scom-editor>
        </i-panel>
    )
}