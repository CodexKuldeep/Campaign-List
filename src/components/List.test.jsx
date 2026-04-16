import { render, screen } from "@testing-library/react";
import List from "./List";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, test } from "vitest";


const mockReducer = (state) => state;

function renderStore(mockState) {
    const store = configureStore({
        reducer: mockReducer,
        preloadedState: mockState
    });

    return render(
        <Provider store={store} >
            <List />
        </Provider>
    )
}

describe('List Component', () => {

    test('Rendering List Component ', () => {
        const mockState = {
            campaigns: {
                items: [
                    {
                        id: 1,
                        name: 'Test Campaign',
                        startDate: '2023-09-09',
                        endDate: '2024-02-02',
                        Budget: 233,
                        userId: 1
                    }
                ]
            },
            users: { items: { 1: 'john' } },
            filters: { name: "", startDate: "", endDate: "" }
        };

        renderStore(mockState);

        expect(screen.getByText("Test Campaign")).toBeInTheDocument();
        expect(screen.getByText("john")).toBeInTheDocument();

    });

    test('Campaign should not be shown if end date start before start date', () => {
        const mockState = {
            campaigns: {
                items: [
                    {
                        id: 1,
                        name: 'Test Campaign',
                        startDate: '2023-09-09',
                        endDate: '2024-02-02',
                        Budget: 233,
                        userId: 1
                    }
                ]
            },
            users: { items: { 1: 'john' } },
            filters: {
                name: "",
                startDate: "2025-02-02",
                endDate: "2022-02-02"
            }
        };

        renderStore(mockState);

        expect(screen.getByText("No Campaign Found")).toBeInTheDocument();
       

    });

})