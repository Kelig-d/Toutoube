import { render, screen } from '@testing-library/react'
import VideoPlayer from "../Components/VideoPlayer";


test("Example 1 renders successfully", () => {
    render(<VideoPlayer/>);

    const element = screen.getByText(/first test/i);

    expect(element).toBeInTheDocument();
})