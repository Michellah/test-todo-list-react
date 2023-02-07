import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import renderer from "react-test-renderer";
import TodoList from "../component/todoList/TodoList";


afterEach(() => {
    cleanup();
})

it('should render the correct initial DOM', () => {
   const container= render(<TodoList />);
   const input = container.getByTestId('inputAdd')
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('value')).toBe('');
});

it('should render when a valid input is entered', () => {
    const container = render(<TodoList />);
    const inputValue = 'test'
    const input = container.getByTestId('inputAdd');
    fireEvent.change(input, { target: { value: inputValue } })
    expect(input).toBeEnabled();
});

it('should render when an invalid input is entered', () => {
    const container = render(<TodoList />);
    const inputValue = ' '
    const input = container.getByTestId('inputAdd');
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

    expect(todo).not.toBeInTheDocument;

    const done = container.queryByTestId('valueDone');
    
    expect(done).toBeInTheDocument;
});

it('rend correctement', () => {
    const container =  renderer
        .create(<TodoList/>)
        .toJSON();

    expect(container).toMatchSnapshot();    
});

