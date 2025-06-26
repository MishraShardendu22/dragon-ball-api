openapi: 3.0.0
info:
  title: Dragon Ball API
  version: 1.0.0
paths:
  /random:
    get:
      summary: Get a random question
      responses:
        '200':
          description: A random question object

  /question/{id}:
    get:
      summary: Get a question by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A specific question object

    put:
      summary: Fully update a question by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                question:
                  type: string
                answer:
                  type: string
                series:
                  type: string
      responses:
        '200':
          description: Updated question

    patch:
      summary: Partially update a question by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
      responses:
        '200':
          description: Partially updated

    delete:
      summary: Delete a question by ID (admin only)
      security:
        - bearerAuth: []
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Deleted

  /series/{series}:
    get:
      summary: Get questions by series
      parameters:
        - name: series
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Array of questions

  /add:
    post:
      summary: Add a new question
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                question:
                  type: string
                answer:
                  type: string
                series:
                  type: string
      responses:
        '201':
          description: Question created

  /delete:
    delete:
      summary: Delete all questions (admin only)
      security:
        - bearerAuth: []
      responses:
        '204':
          description: All questions deleted

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
