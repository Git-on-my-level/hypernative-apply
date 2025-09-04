# Best Practices & Troubleshooting | Hypernative Product Docs

This document provides best practices for developing robust and efficient Hypernative agents, along with guidance on how to troubleshoot common issues.

## 

PythonProcessingVariable Debugging

The `PythonProcessingVariable` is a powerful tool for implementing custom logic, but it can also be a source of errors. Here are some best practices for debugging your Python code.

### 

Silent Failure Detection

One of the most common issues with `PythonProcessingVariable` is the "silent failure," where the Python function fails without raising an exception, resulting in an empty or unexpected output. This is often caused by issues like:

-   **Incorrectly accessing extracted variables:** If you try to access a key that doesn't exist in the `extracted_variables` dictionary, it will return `None`, which can cause issues in your downstream code.
    
-   **API call failures:** If you are making an API call within your function, it might fail due to network issues or an invalid API key, but the `requests` library might not raise an exception by default.
    

**Best Practice:** Always include a `try...except` block in your `PythonProcessingVariable` functions and return a dictionary with an `error` key if an exception occurs. This will make it much easier to identify the source of the problem.

```
def my_python_function(extracted_variables):
    try:
        # Your code here
        result = ...
        return {"result": result}
    except Exception as e:
        return {"error": str(e)}
```

### 

Incremental Development Methodology

When building a complex agent with multiple `PythonProcessingVariable` instances, it is best to develop it incrementally.

1.  **Build and test one variable at a time:** Start with your first `PythonProcessingVariable` and test it thoroughly before moving on to the next one.
    
2.  **Use** `**RunConfig**` **to test with specific data:** Use the `RunConfig` to test your agent with specific transaction hashes or block numbers that you know will trigger the desired behavior.
    
3.  **Print the output of each variable:** Use `print()` statements within your `if __name__ == "__main__":` block to inspect the output of each variable and ensure it is what you expect.
    

### 

Debug Variable Patterns

If you are having trouble with a complex `PythonProcessingVariable`, you can add a "debug" variable immediately after it to inspect its output.

```


# Your complex PythonProcessingVariable
agent.add_variable(PythonProcessingVariable(source_code=my_complex_function, var_name="complex_output"))

# A debug variable to inspect the output
def debug_output(extracted_variables):
    print(extracted_variables.get("complex_output"))
    return {}

agent.add_variable(PythonProcessingVariable(source_code=debug_output, var_name="debug"))
```

### 

Common Python Syntax Issues

The Python environment within the Hypernative SDK has some limitations. Here are some common syntax issues to be aware of:

-   **No in-place operators:** You cannot use `+=`, `-=`, `*=`, or `/=`. You must use the full form, e.g., `x = x + 1`.
    
-   **No tuple unpacking in loops:** You cannot use `for key, value in my_dict.items():`. You must iterate over the keys and then access the value, e.g., `for key in my_dict: value = my_dict[key]`.
    
-   **Import statements must be inside the function:** All `import` statements must be inside the `PythonProcessingVariable` function.
    

### 

Error Handling Patterns

Here is a robust error handling pattern for a `PythonProcessingVariable` that makes an external API call:

```
def fetch_data_from_api(extracted_variables):
    import requests
    try:
        response = requests.get("https://api.example.com/data", timeout=10)
        response.raise_for_status() # Raise an exception for bad status codes
        return {"data": response.json()}
    except requests.exceptions.RequestException as e:
        return {"error": f"API request failed: {e}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {e}"}
```

---

## 

Interacting with the Hypernative API

When interacting with the Hypernative API from within an agent, it is important to do so securely and efficiently.

### 

Use `hn_api_*` Helpers

The Hypernative SDK provides a set of helper functions for interacting with the API:

-   `hn_api_get(endpoint)`
    
-   `hn_api_patch(endpoint, payload)`
    
-   `hn_api_post(endpoint, payload)`
    

These helpers automatically handle authentication using the credentials stored in your agent's context, so you do not need to manage API keys or construct authentication headers manually.

### 

Secure Credential Management

To use the `hn_api_*` helpers, you must first save your Hypernative API credentials as secrets.

1.  **Save your credentials as secrets:**
    
    ```
    from invariantive.model.agent import Agent
    
    agent = Agent(...)
    agent.save_secret("HN_API_CLIENT_ID", "your-client-id")
    agent.save_secret("HN_API_CLIENT_SECRET", "your-client-secret")
    ```
    
2.  **Load the secrets in your agent:**
    
    ```
    from invariantive.model.variable import GetSecretVariable
    
    agent.add_variable(GetSecretVariable(secret_name="HN_API_CLIENT_ID", var_name="hn_client_id"))
    agent.add_variable(GetSecretVariable(secret_name="HN_API_CLIENT_SECRET", var_name="hn_client_secret"))
    ```
    

Once you have loaded the secrets into your agent's context, the `hn_api_*` helpers will automatically use them for authentication.
