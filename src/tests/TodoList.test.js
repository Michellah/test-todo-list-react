import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import renderer from "react-test-renderer";
import TodoList from "../component/todoList/TodoList";


afterEach(() => {
    cleanup();
})

it('should render the component onto the screen', () => {
    render(<TodoList />);
    expect(screen.getByTestId('inputAdd')).toBeInTheDocument();
});

it('renders the correct initial DOM', () => {
    const container = render(<TodoList />);
    const input = container.getByTestId('inputAdd');
    expect(input.getAttribute('value')).toBe('');
});

it('should render when a valid input is entered', () => {
    const inputValue = 'test'
    render(<TodoList />);
    const input = screen.getByTestId('inputAdd');
    fireEvent.change(input, { target: { value: inputValue } })
    expect(input).toBeEnabled();
});

it('should render when an invalid input is entered', () => {
    const inputValue = ' '
    render(<TodoList />);
    const input = screen.getByTestId('inputAdd');
    fireEvent.change(input, { target: { value: inputValue } })
    expect(input.value).toBe(' ');
});

it('it creates a new todo', () => {
    const container = render(<TodoList />);
    const fakeTodo = {
        title: 'test',
        status: false
    };
    const input = container.getByTestId('inputAdd');

    //Create the todo
    fireEvent.change(input, { target: { value: fakeTodo.title } });
    fireEvent.submit(input);


    const todo = container.getByTestId('valueTodo');
    // the name should be in the document
    expect(todo.textContent).toEqual('test');

    // the checkbox values is false
    const checkbox = container.queryByTestId('checkbox');
    expect(checkbox).not.toBeChecked;

    // the input field is blank
    expect(input.value).toBe('');

    // the todo should be in the document
    expect(todo).toBeInTheDocument;
});

it('it add to done', () => {
    const handleChange = jest.fn()

    const container = render(<TodoList />);

    const fakeTodo = {
        title: 'test',
        status: false
    };
    const input = container.getByTestId('inputAdd');

    fireEvent.change(input, { target: { value: fakeTodo.title } });
    fireEvent.submit(input);

    const todo = container.queryByTestId('valueTodo');

    const checkbox = container.queryByTestId('checkbox');
    expect(checkbox).toBeChecked;

    fakeTodo.status = true;

    expect(fakeTodo.status).toBe(true);
    
    
});

it('rend correctemen', () => {
    const container =  renderer
        .create(<TodoList/>)
        .toJSON();

    expect(container).toMatchSnapshot();    
})

// it('it add to done', () => {
//     const fakeTodo = {
//         title: 'test',
//         status: true
//     };
//     const container = render(<TodoList />);
//     const checkbox = container.queryByTestId('checkbox');
//     expect(checkbox).toBeChecked;


// });


// it('it adds in done', () => {
//     const container = render(<TodoList />);
//     const fakeTodo = {
//         title: 'test',
//         status: false
//     };
//     const input = container.getByTestId('inputAdd');

//     //Create the todo
//     fireEvent.change(input, { target: { value: fakeTodo.title } });
//     fireEvent.submit(input);


//     const todo = container.queryByTestId('valueTodo');

//     // the checkbox values is true
//     const checkbox = container.queryByTestId('checkbox');
//     expect(checkbox).toBeChecked;

//     const done = container.queryByTestId('valueDone');
//     expect(done).toEqual('test');

//     // the todo should be in the document
//     expect(todo).not.toBeInTheDocument;

//     expect(done).toBeInTheDocument;
// });
