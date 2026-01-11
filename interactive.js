/*
Welcome stranger. You've now stumbled upon the interactive.js file. This file contains the logic for the interactive mode of the terminal emulator.

This mode allows users to navigate the website using a user interface, rather than typing in commands.
This project features the the whiptail-js library, which I created specifically for this website.

You can check out the whiptail-js library on npm: https://www.npmjs.com/package/whiptail-js
*/

function interactive(mode) {
    let whiptail;

    switch(mode) {
        case 'start':
            $('#whiptail').append($('<div id="whiptail-container"></div>'));

            whiptail = new WhiptailJS({
                title: "Brian Walczak: Website Navigation Menu (interactive mode)",
                text: "Welcome to the interactive mode! This mode allows you to navigate my website using a user interface. You can select different pages and options from the menu below.",
                items: window.acceptableFiles.map((file, index) => ({
                    label: `${index + 1} ${file.name} [${file.file}]`,
                    id: file.file,
                    ...(index === 0 && { focus: true })
                })),
                footer: [{ label: "&lt;Select&gt;", id: 'select' }, { label: "&lt;Finish&gt;", id: 'close' }],
                selector: "#whiptail-container",
                focus: true,
                onSelect: (item, btn) => {
                    whiptail.destroy();

                    switch(btn.id) {
                        case 'select':
                            interactive(item.id);

                            break;
                        case 'close':
                            $('#whiptail').hide();
                            term.focus();

                            break;
                    }
                }
            });

            break;
        default:
            $('#whiptail').append($('<div id="whiptail-container"></div>'));
            let file = window.acceptableFiles.find(file => file.file === mode);

            whiptail = new WhiptailJS({
                title: 'Page: ' + file.name,
                text: file.text,
                footer: [{ label: "&lt;Ok&gt;", id: 'close', focus: true }],
                selector: "#whiptail-container",
                focus: true,
                onSelect: (item, btn) => {
                    whiptail.destroy();
                        
                    interactive('start');
                }
            });
    }
}

function brianConfig(mode) {
    let whiptail;

    switch(mode) {
        case 'start':
            $('#whiptail').append($('<div id="whiptail-container"></div>'));

            whiptail = new WhiptailJS({
                title: "Brian Walczak: Website Configuration Tool (brian-config)",
                text: "Welcome to the brian-config tool! This tool allows you to configure the website and navigate it easily. Start by selecting an option below.",
                items: [
                    { label: "1 Beginner Mode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Navigate this website with a user interface", id: 'beginner', focus: true },
                    { label: "2 Advanced Mode&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explore the bash terminal and its commands", id: 'advanced' },
                    { label: "3 Profile Overview&nbsp;&nbsp;&nbsp;&nbsp;View my other simplified profile page", id: 'mobile' },
                    { label: "4 About brian-config&nbsp;&nbsp;Information about this configuration tool", id: 'about' }
                ],
                footer: [{ label: "&lt;Select&gt;", id: 'select' }, { label: "&lt;Finish&gt;", id: 'close' }],
                selector: "#whiptail-container",
                focus: true,
                onSelect: (item, btn) => {
                    whiptail.destroy();

                    switch(btn.id) {
                        case 'select':
                            brianConfig(item.id);

                            break;
                        case 'close':
                            $('#whiptail').hide();
                            term.focus();

                            break;
                    }
                }
            });

            break;
        case 'beginner':
            $('#whiptail').append($('<div id="whiptail-container"></div>'));
            return interactive('start');

            break;
        case 'advanced':
            $('#whiptail').hide();
            term.focus();

            autoExecute('help');
            break;
        case 'mobile':
            window.open('https://m.brian.re/');
            brianConfig('start');

            break;
        case 'about':
            $('#whiptail').append($('<div id="whiptail-container"></div>'));

            whiptail = new WhiptailJS({
                title: "About brian-config tool",
                text: "Welcome to the brian-config tool! This configuration tool was designed by me, as part of my website, to make it easier for newcomers to navigate my website.<br><br>This tool offers both a Beginner Mode for users who prefer a graphical interface (this one!) and an Advanced Mode for those comfortable with a bash-like terminal (👨🏻‍💻).<br><br>P.S. This interface is powered by <a style='color: inherit;' target='_blank' rel='noopener noreferrer' href='https://www.npmjs.com/package/whiptail-js'>whiptail-js</a> - a JavaScript library I developed specifically for this website and published on npm to help others create similar terminal-style user interfaces. Just a fun fact!",
                footer: [{ label: "&lt;Ok&gt;", id: 'close', focus: true }],
                selector: "#whiptail-container",
                focus: true,
                onSelect: (item, btn) => {
                    whiptail.destroy();
                    
                    brianConfig('start');
                }
            });

            break;
    }
}

/* Copyright 2025 - Brian Walczak */
